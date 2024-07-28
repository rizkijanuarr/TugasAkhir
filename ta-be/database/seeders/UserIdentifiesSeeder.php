<?php

namespace Database\Seeders;

use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserIdentifiesSeeder extends Seeder
{

    public function run()
    {
        $identifies = [
            [
                'name' => 'Operator 1',
            ],
            [
                'name' => 'Operator 2',
            ],
            [
                'name' => 'Operator 3',
            ],
        ];


        foreach ($identifies as $identify) {
            DB::table('users_identifies')->insert([
                'name' => $identify['name'],
                'slug' => Str::slug($identify['name'], '-'),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

}
