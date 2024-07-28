<?php

namespace App\Http\Controllers\Api\Public;

use App\Models\Feedback;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\Resource;
use Illuminate\Support\Facades\Validator;

class FeedbackController extends Controller
{

    public function index()
    {
        $feedback = Feedback::with('user')->when(request()->search, function($feedback) {
            $feedback = $feedback->where('title', 'like', '%'. request()->search . '%');
        })->latest()->paginate(5);


        $feedback->appends(['search' => request()->search]);


        return new Resource(true, 'List Data Feedback', $feedback);
    }

    // POST /api/feedback
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'rating' => 'required|integer|min:1|max:5',
            'comments' => 'required|string',
            'improvements' => 'required|array',
            'improvements.*' => 'exists:improvements,id'
        ]);


        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Simpan data feedback
        $feedback = Feedback::create([
            'user_id' => auth()->guard('api')->user()->id,
            'rating' => $request->rating,
            'comments' => $request->comments,
        ]);

        // assign feedback_improvements
        $feedback->improvements()->attach($request->input('improvements'));
        $feedback->save();



        if($feedback) {

            return new Resource(true, 'Data Feedback Berhasil Disimpan!', $feedback);
        }

        return new Resource(false, 'Data Feedback Gagal Disimpan!', null);
    }
}
