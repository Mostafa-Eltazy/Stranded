<?php
namespace App\Controller;

use App\Entity\Post;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Constraints\Json;

/**
 * @Route("/posts")
 */

class PostController extends AbstractController {

    // FOR FETCHING A LIST OF POSTS
    /**
     * @Route("/", name="get_post_list", methods={"GET"})
     */
    public function postList(){
        // return new Response()
        $repository = $this->getDoctrine()->getRepository(Post::class);
        $items = $repository->findAll();

        return $this->json(['posts'=> $items]);
    }

    //FOR FETCHING A POST WITH ID
    /**
     * @Route("/{id}", name="get_post", methods={"GET"})
     */
    public function getPost($id) {

        $repository = $this->getDoctrine()->getRepository(Post::class);
        $item = $repository->find($id);
        return $this->json($item);

    }

    //FOR ADDING A NEW POST
    /**
    *@Route("/add", name="post_post", methods={"POST"}) 
    */
    public function postPost(Request $request){

        /**@var Serializer $serializer*/
        $serializer = $this->get('serializer');
        $post = $serializer->deserialize($request->getContent(),Post::class,'json');
 
        $em = $this->getDoctrine()->getManager();
        $em -> persist($post);
        $em-> flush();
        return $this->json([$post]);
    }

    //FOR UPDATING A NEW POST
    /**
    *@Route("/edit/{id}", name="edit_post", methods={"PUT"}) 
    */
    public function updatePost(Request $request, $id){

        /**@var Serializer $serializer*/
        $serializer = $this->get('serializer');
        $requestPost = $serializer->deserialize($request->getContent(),Post::class,'json');
        
        $currentPost = new Post();
        $currentPost = $this->getDoctrine()->getRepository(Post::class)->find($id);
        $currentPost->setTitle($requestPost->getTitle());
        $currentPost->setContent($requestPost->getContent());
        

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->flush();

 
        
        return $this->json([$currentPost]);
    }

    // FOR DELETING  A POST
   /**
     * @Route ("/delete/{id}", name="delete_post", methods={"DELETE"})
     **/
    public function delete($id){

        $repository = $this->getDoctrine()->getRepository(Post::class);
        $item = $repository->find($id);

        $em = $this->getDoctrine()->getManager();
        $em->remove($item);
        $em->flush();

        return new Response(null, \Symfony\Component\HttpFoundation\Response::HTTP_NO_CONTENT);
    }

}