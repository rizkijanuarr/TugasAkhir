<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Resources\Resource;
use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Validator;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\Permission as ModelsPermission;

// use App\Http\Controllers\Controller;
// use Illuminate\Support\Facades\Validator;
// use App\Http\Resources\Resource;

class PermissionController extends Controller
{
    // INDEX
    public function index()
    {

        $permissions = Permission::when(request()->search, function($permissions) {
            $permissions = $permissions->where('name', 'like', '%'. request()->search . '%');
        })->latest()->paginate(5);


        $permissions->appends(['search' => request()->search]);


        return new Resource(true, 'List Data Permissions', $permissions);
    }

    // STORE
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'     => 'required',
            'guard_name' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }


        $permissions = ModelsPermission::create([
            'name' => $request->name,
            'guard_name' => $request->guard_name,
        ]);

        if($permissions) {

            return new Resource(true, 'Permissions Berhasil Disimpan!', $permissions);
        }

        return new Resource(false, 'Permissions Gagal Disimpan!', null);
    }

    // SHOW
    public function show($id)
    {
        $permissions = ModelsPermission::whereId($id)->first();

        if($permissions) {

            return new Resource(true, 'Detail Permissions!', $permissions);
        }

        return new Resource(false, 'Detail Permissions Tidak DItemukan!', null);
    }

    // UPDATE
    public function update(Request $request, ModelsPermission $permission)
    {

        $validator = Validator::make($request->all(), [
            'name'     => 'required|unique:permissions,name,'.$permission->id,
            'guard_name' => 'required',
        ]);


        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Perbarui atribut 'name' dan 'guard_name'
        $permission->update([
            'name' => $request->name,
            'guard_name' => $request->guard_name,
        ]);

        if ($permission->wasChanged()) {

            return new Resource(true, 'Permissions Berhasil Diupdate!', $permission);
        }


        return new Resource(false, 'Permissions Gagal Diupdate!', null);
    }

    // DESTROY
    public function destroy(ModelsPermission $permission)
    {

        if($permission->delete()) {

            return new Resource(true, 'Permissions Berhasil Dihapus!', null);
        }


        return new Resource(false, 'Permissions Gagal Dihapus!', null);
    }

    // ALL
    public function all()
    {

        $permissions = Permission::latest()->get();


        return new Resource(true, 'List Data Permissions', $permissions);
    }
}
