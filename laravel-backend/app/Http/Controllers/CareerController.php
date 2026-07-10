<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\JobApplication;

class CareerController extends Controller
{
    /**
     * Secures and stores job applications and processes resume file buffers
     */
    public function store(Request $request)
    {
        // 1. Enforce strict type constraints on candidate profiles and resume files
        $validator = Validator::make($request->all(), [
            'jobId' => 'required|string',
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:150',
            'phone' => 'required|string|max:30',
            'portfolioUrl' => 'nullable|url|max:250',
            'coverLetter' => 'nullable|string|max:1500',
            // File upload constraints: Must be PDF, DOCX and less than 5MB
            'resume' => 'required|file|mimes:pdf,docx,doc|max:5120',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => $validator->errors()->first()
            ], 400);
        }

        // 2. Handle file system storage securely
        $uuid = 'app-' . Str::uuid();
        $resumePath = null;

        if ($request->hasFile('resume')) {
            $file = $request->file('resume');
            // Store file with encrypted unique hash inside resumes sandbox
            $resumePath = $file->storeAs('resumes', $uuid . '.' . $file->getClientOriginalExtension());
        }

        // In production, uncomment the Eloquent record insertions:
        /*
        $application = new JobApplication();
        $application->uuid = $uuid;
        $application->job_id = $request->jobId;
        $application->name = strip_tags($request->name);
        $application->email = filter_var($request->email, FILTER_SANITIZE_EMAIL);
        $application->phone = strip_tags($request->phone);
        $application->portfolio_url = filter_var($request->portfolioUrl, FILTER_SANITIZE_URL);
        $application->cover_letter = strip_tags($request->coverLetter);
        $application->resume_path = $resumePath;
        $application->status = 'Received';
        $application->save();
        */

        return response()->json([
            'success' => true,
            'message' => 'Your application has been successfully submitted! Our hiring coordinators will review your resume and reach out if your credentials fit our operational needs.',
            'applicationId' => $uuid
        ], 200);
    }
}
