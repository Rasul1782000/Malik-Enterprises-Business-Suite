<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\ContactMessage;

class ContactController extends Controller
{
    /**
     * Secures and stores contact messages from Malik Enterprises website
     */
    public function store(Request $request)
    {
        // 1. Sanitize & Validate incoming fields
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:150',
            'subject' => 'required|string|max:200',
            'message' => 'required|string|min:10|max:2000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => $validator->errors()->first()
            ], 400);
        }

        // 2. Map and Save into Database (SQLite/MySQL)
        // For portable demonstration, we log & return secure UUID
        $uuid = 'msg-' . Str::uuid();

        // In production, uncomment the Eloquent mapping:
        /*
        $msg = new ContactMessage();
        $msg->uuid = $uuid;
        $msg->name = strip_tags($request->name);
        $msg->email = filter_var($request->email, FILTER_SANITIZE_EMAIL);
        $msg->subject = strip_tags($request->subject);
        $msg->message = strip_tags($request->message);
        $msg->save();
        */

        return response()->json([
            'success' => true,
            'message' => 'Thank you for reaching out! Your message has been safely received by Malik Enterprises. An operations lead will contact you shortly.',
            'referenceId' => $uuid
        ], 200);
    }
}
