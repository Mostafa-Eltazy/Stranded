<?php
namespace App\Controller;

use App\Entity\Post;
use App\Entity\User;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use App\Service\FileUploader;

/**
 * @Route("/posts")
 */

class PostController extends AbstractController
{
    // FOR FETCHING A LIST OF POSTS
    /**
     * @Route("/", name="get_post_list", methods={"GET"})
     */
    public function postList()
    {
        
        $posts = $this->getDoctrine()
            ->getRepository(Post::class)
            ->findAll();

        return $this->json(
            ['posts' => $posts],
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

    //FOR FETCHING A POST WITH ID
    /**
     * @Route("/{id}", name="get_post", methods={"GET"})
     */
    public function getPost($id)
    {
        $post = $this->getDoctrine()
            ->getRepository(Post::class)
            ->find($id);

        return $this->json(
            ['post' => $post],
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

    //FOR ADDING A NEW POST
    /**
     *@Route("/add", name="post_post", methods={"POST"})
     */
    public function postPost(
        Request $request,
        FileUploader $uploader
    ) {
        // Uplaod a file into the project
        $uploads_directory = "uploads_directory" ;
        $file = $request->files->get('file');
        $file_name = $file->getClientOriginalName();
        $uploader->upload($uploads_directory, $file, $file_name);

        
        $userRef = $this->getDoctrine()
            ->getRepository(User::class)
            ->find($request->request->all()["author_id"]);
        $em = $this->getDoctrine()->getManager();
        // Creating the object with data from request
        $newPost = new Post();
        $newPost->setAuthor($userRef);
        $newPost->setTitle($request->request->all()["title"]);
        $newPost->setContent($request->request->all()["content"]);
        $newPost->setImage("public/uploads_directory/".$file_name);
        $newPost->setDate(new DateTime($request->request->all()["date"]));

        $em->persist($newPost);
        $em->flush();
        return $this->json(
            ['new_post' => $newPost],
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

    //FOR UPDATING A NEW POST
    /**
     *@Route("/edit/{id}", name="edit_post", methods={"PUT"})
     */
    public function updatePost(Request $request, $id)
    {
        $request = json_decode($request->getContent(), true);
        $entityManager = $this->getDoctrine()->getManager();

        $currentPost = $this->getDoctrine()
            ->getRepository(Post::class)
            ->find($id);
        $currentPost->setTitle($request['title']);
        $currentPost->setContent($request['content']);

        $entityManager->flush();

        return $this->json(
            ['updated_post' => $currentPost],
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

    // FOR DELETING  A POST
    /**
     * @Route ("/delete/{id}", name="delete_post", methods={"DELETE"})
     **/
    public function delete($id)
    {
        $post_to_delte = $this->getDoctrine()
            ->getRepository(Post::class)
            ->find($id);

        $em = $this->getDoctrine()->getManager();
        $em->remove($post_to_delte);
        $em->flush();

        return new Response(
            null,
            \Symfony\Component\HttpFoundation\Response::HTTP_NO_CONTENT
        );
    }
}


