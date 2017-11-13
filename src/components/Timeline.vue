<template>
    <section class="container mx-auto bg-white pt-8">
        <div class="w-5/6 sm:w-2/3 mx-auto">
            <h2 class="text-center mb-8 underline">My Timeline</h2>
            <ul class="timeline timeline-centered">
                <timeline-item when="1996" title="I was born 🤰🏼👶🏼"></timeline-item>
                <timeline-item when="1999" title="Used a computer the first time">
                    Yeah, that's no joke! I played a Mario clone on my grandpa's PC.
                </timeline-item>
                <timeline-item when="2010" title="First basic website">
                    I started looking into HTML and CSS for a project
                    I worked on with a friend. It went well, though the outcome wasn't as elegant as it'd be today (as expected).
                    The website even made use of HTML frames 😅.<br>
                    But all beginnings are difficult.
                </timeline-item>
                <timeline-item when="Early 2011" title="First line of code">
                    After getting in touch with basic HTML and CSS a few months before, I started learning
                    Java. The motivation was quite simple: There was an insane hype around "Minecraft", and
                    the plugins were written in Java. Because I wanted to learn writing programs in general (not only to extend the game), I
                    kind of thought starting with Java shouldn't be a bad decision.
                    <br><br>
                    <b>Fun fact</b>:
                    My first program wasn't Hello World, because I wanted to do something more unique instead
                </timeline-item>

                <timeline-item :period="true" title="After plunging into the world of code...">
                    ... I wanted to learn even more. While developing stuff from simple tools right up to GUI based
                    applications with JSON processing, I also looked into databases (MySQL in particular) and PHP, because
                    the concept of dynamic websites fascinated me a lot.
                </timeline-item>

                <timeline-item when="November 11, 2011" title="First internship">
                    In the 9th grade, we had to fulfill a work experience at a company of our choice. Of course,
                    we must apply for that internship regularly. I first thought of working at a computer repair company
                    to gain knowledge about the hardware, but then I applied at a smaller software company in
                    my town and they accepted my application!
                    <br><br>
                    My first task was testing their current system and trying to break it. After reporting the
                    found bugs and caveats they noticed that my understanding was quite good for a 15-year-old guy,
                    so the follow-up tasks were more complex and deep, like creating configs and setting up
                    the database.
                    <br><br>
                    <b>Used Technologies</b><br>
                    Redmine, MySQL, YAML, PHP (Symfony)
                </timeline-item>
                <timeline-item when="July 2015" title="Graduate school - Abitur (1,9)">
                    In 2015 I finished school and did my Abitur (the German A-Levels) at the
                    <em>Europäisches Gymnasium Waldenburg</em> with a final grade of <strong>1.9</strong>
                </timeline-item>
                <timeline-item when="August 2015" title="Founded Developmint">
                    Not even a month after finishing my Abitur, I founded my own company together with two friends.
                    <a href="https://developmint.de" class="developmint no-underline" target="_blank">Developmint</a>
                    <small class="text-xs text-grey">(fancy, eh?)</small>
                    fulfills contract work for mid-sized businesses as well as single persons. Our core competencies are
                    web apps, websites and MacOS/iOS apps. We have done a range of work by now, ranging from simple but good-looking portfolio pages to complex
                    business tools.<br><br>
                    <strong>Interested?</strong> <a class="text-grey hover:text-grey-dark"
                                                    href="mailto:inquiry@lichter.io?subject=Inquiry&body=Hey%20Alex!%0D%0AI've%20seen%20your%20website%20and%20would%20like%20to%20talk%20to%20you%20about%20......."
                >Drop me a line!</a><span class="no-underline"> 😉</span>
                </timeline-item>
                <timeline-item when="October 2015" title="Started studying CS at the TU Dresden">
                    Without a big break, I applied for the Diploma Computer Science course at the TU Dresden,
                    moved there and started to study.
                </timeline-item>
                <timeline-item when="October 2016" title="Internship at ITC AG">
                    As part of the study, a group of four students (including me) had the chance to work on a project contracted by ITC AG.
                    The task was to create a converter for measured data of various formats as a full-stack web app.
                    <br><br>
                    <b>Used Technologies</b><br>
                    Java (Spring), SQL, jQuery, Git
                </timeline-item>
                <timeline-item when="October 2017" title="Contribution to Laravel">
                    Yeah, I <a href="https://github.com/laravel/framework/pull/21745" rel="nofollow" target="_blank">did it</a>!
                    After using Laravel for quite a while in almost all my company and side projects,
                    I finally contributed to the well-known PHP framework.
                </timeline-item>
                <timeline-item when="November 2017" title="Release of Lichter.io">
                    Before applying to companies all over the world of my upcoming semester abroad in 2018, I wanted to
                    have a unique way of displaying my CV. So why not creating an adapted version online?
                    <br><br>
                    <b>Used Technologies</b><br>
                    Vue.js, Tailwind, SCSS, Webpack
                </timeline-item>

                <timeline-item when="More? Coming soon!"></timeline-item>
            </ul>
        </div>
    </section>
</template>
<style lang="scss">
    body {
        color: #768390;
    }

    h1, h2, h3, h4, h5, h6 {
        color: #3D4351;
        margin-top: 0;
    }

</style>
<script>
  import TimelineItem from './TimelineItem.vue'

  export default {
    name: 'Timeline',
    components: {TimelineItem}
  }
</script>