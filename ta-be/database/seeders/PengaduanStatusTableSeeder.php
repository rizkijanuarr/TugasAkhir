<?php

namespace Database\Seeders;

use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PengaduanStatusTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $statuses = [
            [
                'name' => 'Pending',
            ],
            [
                'name' => 'Sedang Diproses',
            ],
            [
                'name' => 'Telah Diselesaikan',
            ],
            [
                'name' => 'Rejected',
            ],
        ];

        foreach ($statuses as $status) {
            DB::table('pengaduan_statuses')->insert([
                'name' => $status['name'],
                'slug' => Str::slug($status['name'], '-'),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
