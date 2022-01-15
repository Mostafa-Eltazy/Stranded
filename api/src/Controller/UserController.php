<?php
namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Service\FileUploader;

/**
 * @Route("/users")
 */

class UserController extends AbstractController
{
    /**
     * @var UserPasswordHasherInterface
     */
    public function __construct(UserPasswordHasherInterface $passwordhasher)
    {
        $this->passwordHasher = $passwordhasher;
    }
    // FOR FETCHING A LIST OF USERS
    /**
     * @Route("/", name="get_users_list", methods={"GET"})
     */
    public function userList()
    {
        $users = $this->getDoctrine()
            ->getRepository(User::class)
            ->findAll();

        return $this->json(
            ['users' => $users],
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

    //FOR FETCHING A USER WITH ID
    /**
     * @Route("/{id}", name="get_user", methods={"GET"})
     */
    public function getUserById($id)
    {
        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->find($id);

        return $this->json(
            ['user' => $user],
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
    
    //FOR ADDING A NEW USER
    /**
     *@Route("/add", name="post_user", methods={"POST"})
     */
    public function createUser(Request $request, FileUploader $uploader)
    {
        $newUser = new User();
        if ($request->files->get('file')) {
            // file uploding logic
            //////////////////////
            $file = $request->files->get('file');
            $file_name = $file->getClientOriginalName();
            $uploader->upload('uploads_directory', $file, $file_name);
            $newUser->setProfilePicture(
                'public/uploads_directory/' . $file_name
            );
        }
        // accesssing the enttiy manager
        ////////////////////////////////
        $em = $this->getDoctrine()->getManager();
        // Creating the object with data from request
        /////////////////////////////////////////////
        $newUser->setUsername($request->request->all()['username']);
        $newUser->setEmail($request->request->all()['email']);
        $newUser->setFname($request->request->all()['fname']);
        $newUser->setLname($request->request->all()['lname']);
        // hasing the password
        ///////////////////////
        $newUser->setPassword(
            $this->passwordHasher->hashPassword(
                $newUser,
                $request->request->all()['password']
            )
        );
        // persisting th eobject in the databse
        //////////////////////////////////////
        $em->persist($newUser);
        $em->flush();
        // return the object as a respons after it's creation and addition to db
        ////////////////////////////////////////////////////////////////////////
        return $this->json(
            ['new_user' => $newUser],
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

    //FOR UPDATING A NEW USER
    /**
     *@Route("/edit/{id}", name="edit_user", methods={"PUT"})
     */
    public function updateUser(Request $request, $id)
    {
        $request = json_decode($request->getContent(), true);
        $entityManager = $this->getDoctrine()->getManager();
        
        $currentUser = $this->getDoctrine()
            ->getRepository(User::class)
            ->find($id);
        $currentUser->setUsername($request['username']);
        $currentUser->setEmail($request['email']);
        $currentUser->setPassword($request['password']);
        $currentUser->setFname($request['fname']);
        $currentUser->setLname($request['lname']);

        $entityManager->flush();
        
        return $this->json(
            ['updated_user' => $currentUser],
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

    // FOR DELETING  A USER
    /**
     * @Route ("/delete/{id}", name="delete_user", methods={"DELETE"})
     **/
    public function delete($id)
    {
        $user_to_delte = $this->getDoctrine()
            ->getRepository(User::class)
            ->find($id);
            
        $em = $this->getDoctrine()->getManager();
        $em->remove($user_to_delte);
        $em->flush();

        return new Response(
            null,
            \Symfony\Component\HttpFoundation\Response::HTTP_NO_CONTENT
        );
    }
    //FOR FETCHING A USER WITH EMAIL AND PASSWORD
    /**
     * @Route("/auth", name="get_user", methods={"GET","POST"})
     */
    public function authinticateUser(Request $request)
    {
        $request = json_decode($request->getContent(), true);
        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->findOneBy(['email' => $request['email']]);
    
        if (
            $this->passwordHasher->isPasswordValid($user, $request['password'])
        ) {
            return $this->json(
                ['user' => $user],
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
        } else {
            return $this->json(['wrong password inforamtion']);
        }
    }
}
