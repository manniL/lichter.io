<template>
    <div class="container mx-auto bg-white p-0">
        <div class="w-5/6 sm:w-2/3 mx-auto">
            <h2 class="text-center mb-8 underline">My Timeline</h2>
            <ul class="timeline timeline-centered">
                <timeline-item when="1996" title="I was born 🤰🏼👶🏼"></timeline-item>
                <timeline-item when="1999" title="Used a computer the first time">
                    Used a computer the first time
                </timeline-item>
                <timeline-item when="2010" title="First basic website">
                    I started looking into HTML and CSS because I wanted to create a website for a project
                    I worked on with a friend. This worked out, though that website was quite crappy (as expected).
                    It even used HTML frames 😅.<br>
                    But all beginnings are difficult.
                </timeline-item>
                <timeline-item when="Early 2011" title="First line of code">
                    After getting in touch with basic HTML and CSS a few months before, I started learning
                    Java. The motivation was quite simple: There was an insane hype around "Minecraft", and
                    the plugins were written in Java. Because I wanted to learn programming in general, I
                    thought starting with Java shouldn't be a bad decision.
                    My goal was to learn Java in general, not only for Minecraft.
                    <br><br>
                    <b>Fun fact</b>:
                    My first program wasn't Hello World, because I wanted to do something more unique instead
                </timeline-item>

                <timeline-item :period="true" title="After plunging into the world of code...">
                    ... I wanted to learn more and more. While developing stuff from simple tools to GUI based
                    applications with JSON processing, I also looked into databases (MySQL) and PHP.
                    <br>
                    The concept of dynamic websites fascinated me a lot.
                </timeline-item>

                <timeline-item when="November 11, 2011" title="First internship">
                    In the 9th grade, we must fulfill a work experience at a company of our choice. Of course,
                    we must apply for that internship regularly. My first thought was a computer repair company
                    to gain knowledge about the hardware, but then I applied at a smaller software company in
                    my town and they accepted my application!
                    <br><br>
                    My first task was testing their current system and trying to break it. After reporting the
                    found bugs and caveats they saw that my understanding was quite good for a 15 year old guy,
                    so the follow-up tasks were more complex and deep, like creating configs and setting up
                    the database.
                    <br><br>
                    <b>Used technologies</b><br>
                    Redmine, MySQL, YAML, PHP (Symfony)
                </timeline-item>
                <timeline-item when="July 2015" title="Graduate school - Abitur (1,9)">
                    In 2015 I finished school and did my Abitur (the German A-Level) at the
                    <em>Europäisches Gymnasium Waldenburg</em> with a final grade of <strong>1.9</strong>
                </timeline-item>
                <timeline-item when="August 2015" title="Founded Developmint">
                    Not even a month after finishing my Abitur, I founded my own company together with two friends.
                    <a href="https://developmint.de" class="developmint no-underline" target="_blank">Developmint</a>
                    <small class="text-xs text-grey">(fancy, eh?)</small>
                    fulfills contract work for mid-sized businesses as well as single persons. Our core competencies are
                    web apps, websites and MacOS/iOS apps. We did a range of work by now, ranging from simple but good-looking portfolio pages to complex
                    business tools.<br><br>
                    <strong>Interested?</strong> Hit me up! 😉
                    <!-- TODO: Add link/cta here -->
                </timeline-item>
                <timeline-item when="October 2015" title="Started studying CS at the TU Dresden">
                    Without a big break, I applied for the Diploma Computer Science course at the TU Dresden,
                    moved there and started to study.
                </timeline-item>
                <timeline-item when="October 2016" title="Internship at ITC AG">
                    As part of the study, a group of four students (including me) had the chance to work on a project contracted by ITC AG.
                    The task was to create a converter for measured data of various formats as a full-stack web app.
                    <br><br>
                    <b>Used technologies</b><br>
                    Java (Spring), SQL, jQuery, Git, HTML/CSS
                </timeline-item>
                <timeline-item when="October 2017" title="Contribution to Laravel">
                    Yeah, I <a href="https://github.com/laravel/framework/pull/21745" rel="nofollow" target="_blank">did it</a>!
                    After using Laravel for quite a while in almost all my company and side projects,
                    I finally contributed to the well-known PHP framework.
                </timeline-item>

                <timeline-item when="More? Coming soon!"></timeline-item>
            </ul>
        </div>
    </div>
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