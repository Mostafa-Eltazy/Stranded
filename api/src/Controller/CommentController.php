<?php
namespace App\Controller;

use App\Entity\Comment;
use App\Entity\Post;
use App\Entity\User;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

/**
 * @Route("/comments")
 */

class CommentController extends AbstractController
{
    // FOR FETCHING A LIST OF Comments
    /**
     * @Route("/", name="get_comments_list", methods={"GET"})
     */
    public function commentList()
    {
        $comments = $this->getDoctrine()
            ->getRepository(Comment::class)
            ->findAll();

        return $this->json(
            ['comments' => $comments],
            200,
            [],
            [
                ObjectNormalizer::CIRCULAR_REFERENCE_HANDLER => function (
                    $obj
                ) {
                    return $obj->getId();
                },
            ]
        );
    }

    //FOR FETCHING A Comment WITH ID
    /**
     * @Route("/{id}", name="get_comment", methods={"GET"})
     */
    public function getComment($id)
    {
        $comment = $this->getDoctrine()->getRepository(Comment::class)->find($id);
        return $this->json(
            ['comment' => $comment],
            200,
            [],
            [
                ObjectNormalizer::CIRCULAR_REFERENCE_HANDLER => function (
                    $obj
                ) {
                    return $obj->getId();
                },
            ]
        );
    }

    //FOR ADDING A NEW COmment
    /**
     *@Route("/add", name="post_comment", methods={"POST"})
     */
    public function postComment(Request $request)
    {
        $request = json_decode($request->getContent(), true);
        $userRef = $this->getDoctrine()
            ->getRepository(User::class)
            ->find($request['author_id']);
        $postRef = $this->getDoctrine()
            ->getRepository(Post::class)
            ->find($request['post_id']);

        $em = $this->getDoctrine()->getManager();
        $newComment = new Comment();
        $newComment->setAuthor($userRef);
        $newComment->setPost($postRef);
        $newComment->setContent($request['content']);
        $newComment->setDate(new DateTime($request['date']));

        $em->persist($newComment);
        $em->flush();
        return $this->json(
            ['new_comment' => $newComment],
            200,
            [],
            [
                ObjectNormalizer::CIRCULAR_REFERENCE_HANDLER => function (
                    $obj
                ) {
                    return $obj->getId();
                },
            ]
        );
    }

    //FOR UPDATING A NEW COMMENT
    /**
     *@Route("/edit/{id}", name="edit_comment", methods={"PUT"})
     */
    public function updatePost(Request $request, $id)
    {
        $request = json_decode($request->getContent(), true);
        $entityManager = $this->getDoctrine()->getManager();

        $currentComment = $this->getDoctrine()
            ->getRepository(Comment::class)
            ->find($id);
        
        $currentComment->setContent($request['content']);

        $entityManager->flush();

        return $this->json(
            ['updated_comment' => $currentComment],
            200,
            [],
            [
                ObjectNormalizer::CIRCULAR_REFERENCE_HANDLER => function (
                    $obj
                ) {
                    return $obj->getId();
                },
            ]
        );
    }

    // FOR DELETING  A COMMENT
    /**
     * @Route ("/delete/{id}", name="delete_comment", methods={"DELETE"})
     **/
    public function delete($id)
    {
        $comment_to_delte = $this->getDoctrine()
            ->getRepository(Comment::class)
            ->find($id);

        $em = $this->getDoctrine()->getManager();
        $em->remove($comment_to_delte);
        $em->flush();

        return new Response(
            null,
            \Symfony\Component\HttpFoundation\Response::HTTP_NO_CONTENT
        );
    }
}
