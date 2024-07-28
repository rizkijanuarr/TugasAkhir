<?php

namespace Database\Seeders;

use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ImprovementsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $improvements = [
            [
                'name' => 'Tampilan Dashboard',
            ],
            [
                'name' => 'Tampilan Login / Register',
            ],
            [
                'name' => 'Kemudahan Penggunaan',
            ],
            [
                'name' => 'Tampilan Visual',
            ],
            [
                'name' => 'Kategori Pengaduan',
            ],
        ];

        foreach ($improvements as $improve) {
            DB::table('improvements')->insert([
                'name' => $improve['name'],
                'slug' => Str::slug($improve['name'], '-'),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
