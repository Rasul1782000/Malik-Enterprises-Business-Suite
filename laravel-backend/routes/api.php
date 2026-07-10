<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CareerController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Active Job listings registry (matches Multan requirements)
Route::get('/jobs', function () {
    return response()->json([
        [
            'id' => 'job-1',
            'title' => 'Plastics Manufacturing Engineer',
            'department' => 'Production',
            'location' => 'Multan, Pakistan (Industrial Estate)',
            'type' => 'Full-time',
            'experience' => '3-5 Years',
            'description' => 'Oversee automated extrusion and blow molding operations at the Multan facility.',
            'requirements' => [
                'Bachelor degree in Polymer or Mechanical Engineering.',
                '3+ years process calibration experience.',
                'Understanding of plastic chemical compositions.'
            ]
        ],
        [
            'id' => 'job-2',
            'title' => 'Senior Machinery Maintenance Technician',
            'department' => 'Maintenance',
            'location' => 'Multan, Pakistan (Industrial Estate)',
            'type' => 'Full-time',
            'experience' => '5+ Years',
            'description' => 'Troubleshoot high-pressure hydraulic pumps and automated gearbox machinery.',
            'requirements' => [
                'Associate Degree in Mechanical troubleshooting.',
                'Expertise in pneumatics and hydraulic components.',
                'Adherence to international factory safety procedures.'
            ]
        ],
        [
            'id' => 'job-3',
            'title' => 'Logistics & Warehouse Operations Manager',
            'department' => 'Logistics',
            'location' => 'Multan, Pakistan (Sher Shah)',
            'type' => 'Full-time',
            'experience' => '4-6 Years',
            'description' => 'Manage inventory tracking and Southern Punjab freight distribution lines.',
            'requirements' => [
                'Degree in Supply Chain or Logistics administration.',
                'Familiarity with WMS scanning interfaces and team leadership.',
                'Negotiations experience with national freight providers.'
            ]
        ]
    ]);
});

// Secure contact submission route
Route::post('/contact', [ContactController::class, 'store']);

// Secure career application & resume loader route
Route::post('/careers/apply', [CareerController::class, 'store']);
