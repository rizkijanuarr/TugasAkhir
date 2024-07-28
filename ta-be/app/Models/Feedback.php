<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    use HasFactory;

    /**
    * GUARDED ATTRIBUTES
    */

    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function improvements()
    {
        return $this->belongsToMany(Improvements::class, 'feedback_improvements', 'feedback_id', 'improvement_id');
    }


}
