<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\Advertisement\AdvertisementResource;
use App\Http\Resources\CommentResource;
use App\Models\Advertisement;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{

    /**
     * Store a newly created resource in storage.
     */
    //Creating controller for posting comments
    public function store(Request $request, Advertisement $advertisement)
    {
        $request->validate([
            'description' => 'required|string',
        ]);


        Comment::create([
            'user_id' => auth()->id(),
            'advertisement_id' => $advertisement->id,
            'description' => $request->description,
        ]);

        $advertisement->load('comments');
        return AdvertisementResource::make($advertisement);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        $this->authorize('delete', $comment);
        $comment->delete();
        return response()->json(['message' => 'Коментарът е изтрит!', 200]);
    }
}
