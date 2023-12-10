import * as THREE from 'three';
import './index.css'
import gsap from 'gsap'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


//scene
const scene = new THREE.Scene();

//import model            okkkkkk when u import 3d objects make sure to put the glb/gltf file with index.html
const loader = new GLTFLoader();
let mixer;
let model;
loader.load('./bird.glb', function(glb)
{
    model = glb.scene;
    model.scale.set(0.1, 0.1, 0.1); // Adjust the scale if needed
    model.position.set(1,3,-1);
    model.rotation.set(0,-1,0) // (up down,right-left, diagnol)
  scene.add(model);
  animateModel();
    
  

    if (glb.animations && glb.animations.length) 
    {
      mixer = new THREE.AnimationMixer(model);
      const action = mixer.clipAction(glb.animations[0]);
      action.play();
    }
    console.log(glb);

    function animateModel() {
      if (model) {
        // Reset model position to start from the right
        model.position.x = 10; // Off-screen right
    
        // GSAP animation
        gsap.to(model.position, {
          x: -10, // Off-screen left
          duration: 20,
          ease: "linear",
          repeat: -1
        });
      }
    }

}, 
function(xhr) {
    console.log((xhr.loaded / xhr.total * 100) + "% loaded");
},
function(error) {
    console.error("An error occurred while loading the GLTF model:", error);
});



//second bird
let mixer3;
let model3;
loader.load('./bird.glb', function(glb)
{
    model3 = glb.scene;
    model3.scale.set(0.05, 0.05, 0.05); // Adjust the scale if needed
    model3.position.set(1,-2,-3);
    model3.rotation.set(0,-1,0) // (up down,right-left, diagnol)
    scene.add(model3);


    
  //nimateModel3();

    


    if (glb.animations && glb.animations.length) 
    {
      mixer3 = new THREE.AnimationMixer(model3);
      const action2 = mixer3.clipAction(glb.animations[0]);
      action2.play();
    }
    console.log(glb);

    // function animateModel3() 
    // {
    //   if (model3) 
    //   {
    //     // Reset model position to start from the right
    //     model3.position.x = 13; // Off-screen right
    //     model3.layers.set(1);
    
    //     // GSAP animation
    //     gsap.to(model3.position,
    //        {
    //       x: -10.5, // Off-screen left
    //       duration: 20.2,
    //       ease: "linear",
    //       repeat: -1
    //     });
    //   }
    // }

}, 
function(xhr) {
    console.log((xhr.loaded / xhr.total * 100) + "% loaded");
},
function(error) {
    console.error("An error occurred while loading the GLTF model:", error);
});


let model4;
loader.load('./Rocketship.glb', function(glb)
{
    model4 = glb.scene;
    model4.scale.set(0.05, 0.05, 0.05); // Adjust the scale if needed
    model4.position.set(5,0.02,0);
    model4.rotation.set(0,-1,0) // (up down,right-left, diagnol)
    scene.add(model4);



}, 
function(xhr) {
    console.log((xhr.loaded / xhr.total * 100) + "% loaded");
},
function(error) {
    console.error("An error occurred while loading the GLTF model:", error);
});



//this sets the birds along a curve path 

const points = 
[
  new THREE.Vector3(10, -3, 0),
  new THREE.Vector3(7, 1, 0),
  new THREE.Vector3(4, 1, 0),
  new THREE.Vector3(2, -2, -3),
  new THREE.Vector3(4, -6, -3)
];
const curve = new THREE.CatmullRomCurve3(points);

let t = 0;
const animateBird = (model3) => {
    t += 0.001;
    if (t > 1) t = 0;

    const position = curve.getPoint(t);
    model3.position.set(position.x, position.y, position.z);

    const tangent = curve.getTangent(t);
    model3.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tangent.normalize());
};

const points2 = 
[
  new THREE.Vector3(10, -3, -10),
  new THREE.Vector3(7, 1, 0),
  new THREE.Vector3(4, 1, 0),
  new THREE.Vector3(2, -2, -3),
  new THREE.Vector3(4, -6, -3)
];
const curve2 = new THREE.CatmullRomCurve3(points2);

let p = 0;
const animateBird2 = (model) => 
{
    p += 0.00084;
    if (p > 1) p = 0;

    const position = curve2.getPoint(p);
    model.position.set(position.x, position.y, position.z);

    const tangent = curve2.getTangent(p);
    model.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tangent.normalize());
};

//this segment is the rocket ship curve path

const points3 = 
[
  new THREE.Vector3(5,0.02,0),
  new THREE.Vector3(5, 1, 0),
  new THREE.Vector3(4, 1.5, 0),
  new THREE.Vector3(-4, 2, 0),
  new THREE.Vector3(-4.5,2,0)
];
const curve3 = new THREE.CatmullRomCurve3(points3);

let v = 0;
const animateShip = (model4) => 
{
  if(!animationCompleted)
  {
    v += 0.0015;
    if (v > 1)
    {
      {
        v = 1; // Ensure v does not exceed 1
        animationCompleted = true;
      }
  
    } 

    const position = curve3.getPoint(v);
    model4.position.set(position.x, position.y, position.z);

    const tangent = curve3.getTangent(v);
    model4.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tangent.normalize());
  }
};

//this segment starts the launch animation on D, but also resets it b/c if you dont do that youll see it flying back to its original position to loop lol
let startAnimation = false;
let animationCompleted = false;
function resetstartAnimation(model4)
 {
  v = 0; // Reset the animation progress
  model4.position.set(5, 0.02, 0); // Reset position
  startAnimation = true;
  animationCompleted = false;

 }

window.addEventListener('keydown', function(launchkey)
 {
  if (launchkey.key === 'd' || launchkey.key === 'ArrowRight') 
  {
    resetstartAnimation(model4);
  }
});

//this segment adds a red line to the path, makes it easier to edit the path just change 'curve' to whatever object curve it is

// const curveGeometry = new THREE.BufferGeometry().setFromPoints(curve3.getPoints(50));
// const curveMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
// const curveObject = new THREE.Line(curveGeometry, curveMaterial);
// scene.add(curveObject);




//create sphere

//( 1, 1, 1 ) ok so first 1 is radius, Second and Third 1s are segments.
const geometry = new THREE.IcosahedronGeometry(1,); 
const material = new THREE.MeshStandardMaterial(
   {
    color: "#d3321d",
    roughness: 0.7,
    metalness: 1,
   } ); //material is how it looks like, geometry is just the shape but material is apparence
const sphere = new THREE.Mesh( geometry, material ); //combination of geometry and meterial
sphere.castShadow = true; // Enable the sphere to cast shadows
sphere.receiveShadow = true; // Enable the sphere to receive shadows
sphere.position.set(-4.5,2,1)
sphere.scale.set(3,3,3);
let currentSphereColor = new THREE.Color('#d3321d');
scene.add( sphere )



//change sphere color when hit d
window.addEventListener('keydown', function(event)
 {
  if (event.key === 'd' || event.key === 'ArrowRight')
   {
      changeSphereColor(new THREE.Color('#FFFFFF')); // Change to red
   } 
   else if (event.key === 'a' || event.key === 'ArrowLeft') 
   {
      changeSphereColor(new THREE.Color('#d3321d')); // Change back to white
   }
});

function changeSphereColorDay1()
{
 sphere.material.color.set('#FFA500')
}
window.addEventListener('keydown', function(hitkey)
 {
  if (hitkey.key === 'a' || hitkey.key === 'ArrowLeft') 
  {
    changeSphereColorDay1();
  }
});



//add mini stars 
const geometry1 = new THREE.CircleGeometry();
const material1 = new THREE.MeshBasicMaterial(
{
  color: "#ffffff"
});
const star1 = new THREE.Mesh(geometry1, material1)
star1.position.set(-2.6,1, 0)
star1.scale.set(0.035,0.035,0.035);
scene.add(star1)

const star2 = new THREE.Mesh(geometry1, material1)
star2.position.set(1,3,0)
star2.scale.set(0.035,0.035,0.035);
scene.add(star2)

const star3 = new THREE.Mesh(geometry1, material1)
star3.position.set(-3,0,0)
star3.scale.set(0.035,0.035,0.035);
scene.add(star3)

const star4 = new THREE.Mesh(geometry1, material1)
star4.position.set(-0.8,1.5,0)
star4.scale.set(0.035,0.035,0.035);
scene.add(star4)

const star5 = new THREE.Mesh(geometry1, material1)
star5.position.set(-1,3.5,0)
star5.scale.set(0.035,0.035,0.035);
scene.add(star5)

const star6 = new THREE.Mesh(geometry1, material1)
star6.position.set(-3.3,3.3,0)
star6.scale.set(0.035,0.035,0.035);
scene.add(star6)

const star7 = new THREE.Mesh(geometry1, material1)
star7.position.set(2,-1,0)
star7.scale.set(0.035,0.035,0.035);
scene.add(star7)

const star8 = new THREE.Mesh(geometry1, material1)
star8.position.set(3,2,0)
star8.scale.set(0.035,0.035,0.035);
scene.add(star8)

const star9 = new THREE.Mesh(geometry1, material1)
star9.position.set(4,3,0)
star9.scale.set(0.035,0.035,0.035);
scene.add(star9)

const star10 = new THREE.Mesh(geometry1, material1)
star10.position.set(-5,-1,0)
star10.scale.set(0.035,0.035,0.035);
scene.add(star10)

const star11 = new THREE.Mesh(geometry1, material1)
star11.position.set(-7,-1.5,0)
star11.scale.set(0.035,0.035,0.035);
scene.add(star11)

const star12 = new THREE.Mesh(geometry1, material1)
star12.position.set(3.5,0.5,0)
star12.scale.set(0.035,0.035,0.035);
scene.add(star12)

const star13 = new THREE.Mesh(geometry1, material1)
star13.position.set(-1.3,0,0)
star13.scale.set(0.035,0.035,0.035);
scene.add(star13)

const star14 = new THREE.Mesh(geometry1, material1)
star14.position.set(1,1,0)
star14.scale.set(0.035,0.035,0.035);
scene.add(star14)

const star15 = new THREE.Mesh(geometry1, material1)
star15.position.set(-6.7,4,0)
star15.scale.set(0.035,0.035,0.035);
scene.add(star15)

const star16 = new THREE.Mesh(geometry1, material1)
star16.position.set(-4.5,-4,0)
star16.scale.set(0.035,0.035,0.035);
scene.add(star16)

const star17 = new THREE.Mesh(geometry1, material1)
star17.position.set(-0.98,-3.8,0)
star17.scale.set(0.035,0.035,0.035);
scene.add(star17)

const star18 = new THREE.Mesh(geometry1, material1)
star18.position.set(7,1,0)
star18.scale.set(0.035,0.035,0.035);
scene.add(star18)

const star19 = new THREE.Mesh(geometry1, material1)
star19.position.set(6,3.8,0)
star19.scale.set(0.035,0.035,0.035);
scene.add(star19)

const star20 = new THREE.Mesh(geometry1, material1)
star20.position.set(3.3,-4,0)
star20.scale.set(0.035,0.035,0.035);
scene.add(star20)


//earth 

let earth;

loader.load('./Earth.glb', function(glb)
{
  earth = glb.scene;
  earth.scale.set(0.06, 0.06, 0.06); // Adjust the scale if needed
  earth.position.set(5,-4.5,0);
  earth.rotation.set(0,0,0) // (up down,right-left, diagnol)
  scene.add(earth)
});
//sizes
const sizes = 
{
  width: window.innerWidth,
  height: window.innerHeight,
}
//lights/lighting
const light1 = new THREE.PointLight(0xffffff, 100, 900) // (color, light intensity, distance, decay)
light1.position.set(0,10,10)
light1.castShadow = false;

scene.add(light1)

// const light2 = new THREE.PointLight(0xffffff, 100, 500) // (color, light intensity, distance, decay)
// light2.position.set(10,-10,-10)
// light2.castShadow = false;

// scene.add(light2)

const light3 = new THREE.PointLight(0xffffff, 50, 500) // (color, light intensity, distance, decay)
light3.position.set(-5,1,1)
light3.castShadow = false;

scene.add(light3)

const light4 = new THREE.PointLight(0xffffff, 350, 500) // (color, light intensity, distance, decay)
light4.position.set(-10,10,-10)
light4.castShadow = false;

light1.layers.enable(0); // Light affects default layer (0) but not layer 1
//light2.layers.enable(0); // Same for other lights
light3.layers.enable(0);
light4.layers.enable(0);

scene.add(light4)



 

//Camera

const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height); //(field of view, aspect ratio)
camera.position.z = 10 //position camera back 20 units back (the measurment could be anything u desire)
scene.add(camera)

//audio - holy sht this is the final thing finallllyyyy
const listener = new THREE.AudioListener();
scene.add(listener);

// Create separate audio sources for each sound
const birdSound = new THREE.Audio(listener);
const rocketSound = new THREE.Audio(listener);

// Load bird sound
const audioLoader = new THREE.AudioLoader();
audioLoader.load('./birds-19624.mp3', function(buffer) //idk what buffer does exactly but its a function that makes it play the sound
{
    birdSound.setBuffer(buffer);
    birdSound.setLoop(true);
    birdSound.setVolume(0.8);
    birdSound.play();
});

// Load rocket sound
audioLoader.load('./large-rocket-engine-86240.mp3', function(buffer) 
{

    rocketSound.setBuffer(buffer);
    rocketSound.setLoop(false);
    rocketSound.setVolume(0.6);
    // Don't play it here; it will be played on key press
});

// Event listener for keydown
document.addEventListener('keydown', function(event) 
{
    if (event.key === 'd' || event.key === 'ArrowRight') 
    {
        // Play the rocket sound when 'D' is pressed
        if (!rocketSound.isPlaying) 
        {
            rocketSound.play();
        }
    }
});



//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer
({ 
  canvas: document.querySelector('.webgl'),
  alpha: true // This makes the background of the canvas transparent
});

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(3);    //makes it smoother
renderer.shadowMap.enabled = true;
renderer.render(scene, camera)


//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.enableRotate = false

//Resize

window.addEventListener('resize', () => 
{
  //update sizes
  sizes.width = window.innerWidth;    //update as in lets say i drag the window to make it bigger, it needs to update
  sizes.height = window.innerHeight; 
  //update camera
  camera.updateProjectionMatrix()
  camera.aspect = sizes.width / sizes.height
  renderer.setSize(sizes.width, sizes.height)
})

const clock = new THREE.Clock();

const loop = () => // this loop basicalyy just keeps updating everything to make sure everythings is in sync
{
  controls.update()
  const delta = clock.getDelta();   //the reason why u put if statements is b/c if the model isn't loaded then it will crash so you put the if to make sure it only runs when the model is loaded
    if (mixer) mixer.update(delta);
    if (mixer3) mixer3.update(delta);
    if (model3) animateBird(model3)
    if (model) animateBird2(model)
    if (startAnimation && model4 && !animationCompleted) animateShip(model4);

  sphere.rotation.y += 0.005; // Adjust rotation speed as needed
  sphere.rotation.z += 0.005;
  
  if (earth)
   {
    earth.rotation.y += 0.005; // Rotate around Y-axis for a more realistic effect
  }
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop)
}
loop();

//timeline magic???
const t1 = gsap.timeline({defaults: {duration: 1}})
t1.fromTo(sphere.scale, {x:0, y:0, z:0}, {x:1.5, y:1.5, z:1.5}) //i named my sphere, sphere and not mesh so when vid says mesh. put sphere
t1.fromTo('nav', { y:'-100%' }, { y: '0%' }) //this brings the navigator tabs at the top from nothing into the screen
t1.fromTo('.title', {opacity: 0}, {opacity: 1})


//sphere rotate on click 
let isDragging = false;
let previousMousePosition = {
    x: 0,
    y: 0
};

const onMouseDown = (e) => {
    isDragging = true;
    previousMousePosition.x = e.clientX;
    previousMousePosition.y = e.clientY;
};

const onMouseMove = (e) => {
    if (isDragging) {
        const deltaMove = {
            x: e.clientX - previousMousePosition.x,
            y: e.clientY - previousMousePosition.y
        };

        const rotationSpeed = 0.005; // Adjust rotation sensitivity

        sphere.rotation.y += deltaMove.x * rotationSpeed;
        sphere.rotation.x += deltaMove.y * rotationSpeed;

        previousMousePosition.x = e.clientX;
        previousMousePosition.y = e.clientY;
    }
};

const onMouseUp = () => {
    isDragging = false;
};

// Add event listeners
canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mousemove', onMouseMove, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mouseout', onMouseUp, false);

//Mouse Animation Colorsssssss
let mouseDown = false;
let rgb = [];
window.addEventListener('mousedown', () => (mouseDown = true)) //when mouse is clicked mouseDown turns true
window.addEventListener('mouseup', () => (mouseDown = false))

window.addEventListener('mousemove', (e) => 
{
  if(mouseDown)
  {
   let rgb = 
    [
      Math.round(e.pageX / sizes.width * Math.floor(Math.random() * 255)),
      Math.round(e.pageY / sizes.height * Math.floor(Math.random() * 255)),
      Math.floor(Math.random() * 255),
    ] //e.pageX/Y is where the mouse is on the page, return value from where the mouse is on the screen

    //lets animate
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`) //make sure you put ` and not '
    gsap.to(sphere.material.color, 
    {
      r: newColor.r, 
      g: newColor.g, 
      b: newColor.b,
    })
    currentSphereColor.copy(sphere.material.color);
  }
}
);

//this is basically a bug fix and sets the color of the sphere(sun/moon) after i click and drage otherwise for some reason i have to click d twice for it to change to the moon
function changeSphereColor(newColor) {
  gsap.fromTo(sphere.material.color, 
      {
          r: currentSphereColor.r,
          g: currentSphereColor.g,
          b: currentSphereColor.b
      }, 
      {
          r: newColor.r, 
          g: newColor.g, 
          b: newColor.b,
          duration: 1, // Duration of the transition in seconds
          onUpdate: () => {
              // Update the current color as the animation progresses
              currentSphereColor.copy(sphere.material.color);
          }
      }
  );
}


//change background color when i hit a or d
function changeToBg2() {
  const bg1 = document.getElementById('background1');
  const bg2 = document.getElementById('background2');

  bg1.style.opacity = '0';
  bg2.style.opacity = '1';
}

function changeToBg1() {
  const bg1 = document.getElementById('background1');
  const bg2 = document.getElementById('background2');

  bg1.style.opacity = '1';
  bg2.style.opacity = '0';
}

// Keydown event listener
window.addEventListener('keydown', function(event)
 {
  if (event.key === 'd' || event.key === 'ArrowRight')
   {
      changeToBg2();
   } 
  else if (event.key === 'a' || event.key === 'ArrowLeft') 
  {
      changeToBg1();
  }
});



//text fade in
document.addEventListener('keydown', function(event) {
  var aboutMe = document.querySelector('.AboutMe');
  var summary = document.querySelector('.Summary');
  var hello = document.querySelector('.Hello');
  var job = document.querySelector('.Job');

  if (event.key === 'd' || event.key === 'ArrowRight') {
      // Show AboutMe and Summary, Hide Hello and Job
      aboutMe.classList.add('visible');
      aboutMe.classList.remove('hidden');
      summary.classList.add('visible');
      summary.classList.remove('hidden');
      hello.classList.add('hidden');
      hello.classList.remove('visible');
      job.classList.add('hidden');
      job.classList.remove('visible');
  } else if (event.key === 'a' || event.key === 'ArrowLeft') {
      // Hide AboutMe and Summary, Show Hello and Job
      aboutMe.classList.add('hidden');
      aboutMe.classList.remove('visible');
      summary.classList.add('hidden');
      summary.classList.remove('visible');
      hello.classList.add('visible');
      hello.classList.remove('hidden');
      job.classList.add('visible');
      job.classList.remove('hidden');
  }
});
