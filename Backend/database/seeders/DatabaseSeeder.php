<?php

namespace Database\Seeders;

use App\Models\AvailableMonth;
use App\Models\Car;
use App\Models\Regional;
use App\Models\Regionals;
use App\Models\Societies;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

       $regional = Regional::create([
        'province' => 'Jawa Timur',
        'district' => 'Banyuwangi'
       ]);

       Societies::create([
        'id_card_number' => '12345678',
        'password' => Hash::make('rahasia123'),
        'name' => 'Aryaaa',
        'born_date' => '2008-12-02',
        'gender' => 'male',
        'address' => 'Jln. Genteng Banyuwangi',
        'regional_id' => $regional->id
       ]);

       $car1 = Car::create([
        'name' => 'Toyota FT 86',
        'brand' => 'Toyota',
        'price' => 900000000,
        'description' => 'Toyota FT 86 Car Is The Best'
       ]);

       AvailableMonth::create(['car_id' => $car1->id, 'month' => 12 ]);
       AvailableMonth::create(['car_id' => $car1->id, 'month' => 24]);
       AvailableMonth::create(['car_id' => $car1->id, 'month' => 48]);
    }
}
