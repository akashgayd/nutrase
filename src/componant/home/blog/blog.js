import React from 'react'

import First from '../../../aseets/seven.avif'
import Second from '../../../aseets/second.avif'
import Third from '../../../aseets/third.avif'
import Seven from '../../../aseets/four.avif'
import Ten from '../../../aseets/five.avif'
import Six from '../../../aseets/six.avif'
import Eight from '../../../aseets/four.avif'
import Header from '../../common/header/Header';
import Footer from '../../common/Footer/footer'


import './blog.css'

const Blog = () => {

  return (
   
    <>
    <Header/>
     <div className='About-us-main-cont-cont'>
           
           <div className='blog-heading '>
           <h1>Blog Details</h1>
           <p style={{cursor:"pointer"}}><a>Home</a> &nbsp;//&nbsp;<a>Blog</a>&nbsp;//&nbsp;<a> <span style={{  color:" rgb(241, 180, 10)"}}>Blog Details</span></a></p>

           </div>
    </div> 


<br></br>
<br></br>

     <div className='blog-second-content container'>


         <div className='blog-content'>
               <br></br>
               <br></br>
              <h1>Fitness Blogs You Need to Follow</h1>
              <br></br>
              <p>Today, more than ever, there is a renewed focus and awareness on health and fitness. People are truly beginning to understand how exercise not only helps your body, but your mind too. As a result, people are looking for more information on their journey to good health. But how do you find the right place to get quality information on health and fitness? There are a lot of blogs out there, and not all of them provide the best or most reliable information.

              Here, we’ve compiled a list of the best fitness blogs for you to learn and grow from. Along with classic blogs on strength training and health, we’ve also included a number of fitness blogs focused on wellness and more holistic aspects of health.</p>


         <div className='one'>
            
            <img src={Ten} />
         </div>

<br></br>
<div>

          <h1>Breaking Muscle – Chris Colucci and Robert Zeglinski</h1>
          <p>Breaking Muscle is one of the leading fitness blogs on the internet. Focused on strength sports — like weightlifting, powerlifting, CrossFit, and Strongman — it provides readers with advice on how to build muscle, including training tips and nutrition information.

          The blog has workout guides for each muscle group, reviews of equipment and supplements, and advice on how to  work out safely and effectively. It aims to help its readers achieve their fitness goals while improving their overall health.

</p>


 </div>

 <br></br>

<div>

       <h1>Nerd Fitness – Steve Kamb</h1>
       <p>Nerd Fitness aims to help readers have a good time while getting fit. Its founder, Steve Kamb, started the site in 2009 to “provide a fun place for nerds to learn about health and fitness, chat about gaming and comics, and live better lives.”

            Nerd Fitness provides beginner guides to various health and fitness, including nutrition and specific workouts. It focuses on building a strong community based on shared interests, to help readers encourage each other and work towards their shared goals.

            The blog is full of “geeky” references — from Star Wars, Lord of the Rings, the Matrix, and more. This has helped Nerd Fitness become an invaluable resource for people looking to improve their performance who may not feel they fit in with the stereotypical “fitness” crowd.</p>

            </div>


            <br></br>

<div>

            <h1>The Body Coach – Joe Wicks</h1>
            <p>Nerd Fitness aims to help readers have a good time while getting fit. Its founder, Steve Kamb, started the site in 2009 to “provide a fun place for nerds to learn about health and fitness, chat about gaming and comics, and live better lives.”

            Nerd Fitness provides beginner guides to various health and fitness, including nutrition and specific workouts. It focuses on building a strong community based on shared interests, to help readers encourage each other and work towards their shared goals.

            The blog is full of “geeky” references — from Star Wars, Lord of the Rings, the Matrix, and more. This has helped Nerd Fitness become an invaluable resource for people looking to improve their performance who may not feel they fit in with the stereotypical “fitness” crowd.</p>

</div>
<br></br>

<div>

       <h1>The Runner Beans – Charlie Watson</h1>
       <p>The Runner Beans is a fitness blog founded by Charlie Watson, an experienced runner and nutritionist. The blog offers helpful advice on running, nutrition, and lifestyle tips to help readers reach their goals in a healthy way. It provides training plans, meal ideas, and recipes.

The Runner Beans also has a strong focus on the mental aspects of running, which can often be overlooked by other blogs. It provides support for dealing with common issues such as motivation, self-doubt, and anxiety that can come up during the journey toward physical fitness.

</p>

</div>



<div>

<h1>Knocked-Up Fitness – Julie Wiebe</h1>
<p>Knocked-Up Fitness, run by personal trainer and pre/postnatal exercise specialist Julie Wiebe, provides tailored advice on safely staying fit during and after pregnancy. It covers topics such as nutrition, workouts, mental health, lifestyle habits and more. Posts  feature helpful tips from experienced trainers and interviews with inspiring moms who share their stories of staying active while pregnant or postpartum.



</p>


</div>



<div>

          <h1>Born Fitness – Adam Bornstein</h1>
          <p>Born Fitness is a fitness blog founded by Adam Bornstein, former editor-in-chief of Men’s Health Magazine. It provides readers with comprehensive guides on achieving their health and fitness goals effectively and sustainably.

              The blog covers nutrition, supplementation, strength training, cardio workouts, and lifestyle habits. With its evidence-based approach to achieving health and fitness goals, the blog is an invaluable resource for people looking to take control of their own health and fitness journey. It also offers helpful advice from experts who can provide valuable insights into different aspects of health and fitness that are often overlooked or misunderstood, like understanding calories and maintaining fitness and strength as you get older.

              </p>


 </div>
<br></br>
<br></br>


         </div>

    </div> 


    {/* ---------------------------------------------------------- */}

   <br></br>
   <br></br>

     <div className='recent'>

      <h1>RECENT BLOG</h1>
     </div>
     <br></br>

    <div className='card-content'>

       <div className='box-element'>

       <img src={First}/>
       <br></br>


       <h5>What is Mindful Eating? Your Complete Guide to Enjoying Your Food More</h5>
       <br></br>

       <p>Explore what mindful eating is in this complete guide, offering principles, benefits, and tips to savor food and enhance well-being. Free consultation!</p>


       </div>

       <div className='box-element'>
       <img src={Second}/>
       <br></br>

       <h5>Fitness vs. Wellness: Why Both Matter for a Fulfilling Life</h5>
       <br></br>

       <p>Explore the benefits of exercise for Alzheimer's prevention and management. Boost brain health, overcome challenges, and improve life quality. Free consultation!</p>

       </div>



       <div className='box-element'>
       <img src={Third}/>
       <br></br>

       <h5>Achieving Optimal Health: How to Make a Habit That Sticks for Life</h5>
       <br></br>
       <p>Discover how to make a habit stick for life with our comprehensive guide to creating healthy habits. Achieve optimal health with practical tips!</p>



       </div>



       <div className='box-element'>

       <img src={Eight}/>
       <br></br>

       <h5>Insulin Resistance Diet: 7 Foods for Insulin Resistance</h5>
       <br></br>
       <p>Learn how to keep your insulin levels in check with these 7 foods that are perfect for an insulin resistance diet.</p>


       </div>


       <div className='box-element'>
       <img src={Seven}/>
       <br></br>

       <h5>Celebrate the Non-Scale Victories</h5>
       <br></br>
       <p>WStarting on a total health and fitness journey can be intimidating. There may be a lot of new things for you to learn about nutrition </p>


       </div>


       <div className='box-element'>
       <img src={Six}/>
       <br></br>

       <h5>Whole-Body Wellness: Why You Need More Than Just a Fitness Consultant</h5>
<br></br>
       <p>When it comes to fitness, a one-size-fits-all approach won’t cut it! Achieving and sustaining higher levels of physical strength requires more than just a fitness</p>


       </div>
    </div>







    {/* ---------- */}

    <div className=''>



    </div>
    <Footer/>

    </>
  )
}

export default Blog;