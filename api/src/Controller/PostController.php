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
     * @Route("/{page}", name="get_post_list", methods={"GET"})
     */
    public function postList($page, Request $request)
    {
        $limit = $request->get('limit');
        $offset = $limit * ($page - 1);

        $totalPosts = $this->getDoctrine()
            ->getManager()
            ->getRepository(Post::class)
            ->createQueryBuilder('a')
            ->select('count(a.id)')
            ->getQuery()
            ->getSingleScalarResult();

        $posts = $this->getDoctrine()
            ->getManager()
            ->createQueryBuilder()
            ->add('select', 'posts')
            ->add('from', 'App\Entity\Post posts')
            ->setFirstResult($offset)
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult();

        return $this->json(
            [
                'page' => $page,
                'limit' => $limit,
                'totalPosts' => $totalPosts,
                'posts' => $posts,
            ],
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
    public function postPost(Request $request, FileUploader $uploader)
    {
        $newPost = new Post();
        // Uplaod a file into the project
        if ($request->files->get('file')) {
            $uploads_directory = 'uploads_directory';
            $file = $request->files->get('file');
            $file_name = $file->getClientOriginalName();
            $uploader->upload($uploads_directory, $file, $file_name);
            $newPost->setImage('public/uploads_directory/' . $file_name);
        }

        $userRef = $this->getDoctrine()
            ->getRepository(User::class)
            ->find($request->request->all()['author_id']);
        $em = $this->getDoctrine()->getManager();
        // Creating the object with data from request
        $newPost->setAuthor($userRef);
        $newPost->setTitle($request->request->all()['title']);
        $newPost->setContent($request->request->all()['content']);
        $newPost->setDate(new DateTime($request->request->all()['date']));
        $newPost->setIsEdited(false);

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
     *@Route("/edit", name="edit_post", methods={"POST"})
     */
    public function updatePost(Request $request, FileUploader $uploader)
    {
        // $newPost = new Post();
        $currentPost = $this->getDoctrine()
            ->getRepository(Post::class)
            ->find($request->request->all()['post_id']);
        // Uplaod a file into the project
        if ($request->files->get('file')) {
            $uploads_directory = 'uploads_directory';
            $file = $request->files->get('file');
            $file_name = $file->getClientOriginalName();
            $uploader->upload($uploads_directory, $file, $file_name);
            $currentPost->setImage('public/uploads_directory/' . $file_name);
        }
        $entityManager = $this->getDoctrine()->getManager();
        $currentPost->setTitle($request->request->all()['title']);
        $currentPost->setContent($request->request->all()['content']);
        $currentPost->setEditDate(
            new DateTime($request->request->all()['date'])
        );
        $currentPost->setIsEdited(true);

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
     * @Route ("/delete", name="delete_post", methods={"POST"})
     **/
    public function delete(Request $request)
    {
        $post_to_delte = $this->getDoctrine()
            ->getRepository(Post::class)
            ->find($request->request->all()['post_id']);

        $em = $this->getDoctrine()->getManager();
        $em->remove($post_to_delte);
        $em->flush();

        return new Response(
            null,
            \Symfony\Component\HttpFoundation\Response::HTTP_NO_CONTENT
        );
    }
}
