<script setup lang="ts">
definePageMeta({
  documentDriven: false
})

const title = 'Consulting'
const description = 'Companies reach out to help them build better TypeScript, Vue and/or Nuxt applications - from solving problems to discussing the right abstractions and architecture. Learn more about the services I offer.'

useSeoMeta({
  title,
  description,
})

defineOgImageComponent('General')

</script>

<template>
  <div>
    <AppSection>
      <ParagraphDecoration />
      <AppParagraph look="heading" class="mt-4" tag="h1">Consulting</AppParagraph>
      <div class="md:flex md:gap-16">
        <div class="prose md:prose-lg lg:prose-xl pt-8 max-w-prose">
          <p>
            Companies reach out to help them build better TypeScript, Vue and/or Nuxt applications
            - from solving problems to discussing the right abstractions and architecture.
          </p>

          <h2>Consulting Services</h2>
          <p>Every company is different and their needs vary. That's why I offer a wide range of consulting
            services, including but not limited to:</p>
          <ul>
            <li>Architecture and Conception</li>
            <li>Code Reviews and Audits</li>
            <li>Improving Performance</li>
            <li>Ensuring your applications meet the best practices</li>
            <li>Solving existing problems of your application</li>
          </ul>

          <h2>Process</h2>

          <p>
            The process is simple: You
            <AppMeetingButtonWrapper meeting="intro-website">
              <button
                class="text-red-400 underline decoration-red-400/30 hover:decoration-red-400 transition-all font-bold">reach
                out to me</button>
            </AppMeetingButtonWrapper> and we discuss your needs.
            After that, I'll send you a proposal based on what we agreed upon in the call and we'll
            get started.
          </p>

          <p>
            As mentioned before, the collaboration can range from one-off consulting sessions to long-term project
            guidance.
            Everything from reviewing PRs regularly, and firefighting issues, to discussing the right architecture and
            abstractions is possible.
          </p>

          <h2>Expertise</h2>

          <p>
            Please convince yourself of my expertise by taking a look at this website. Here I share knowledge in deep-dive
            <AppLink to="/articles">blog posts</AppLink>,
            and introductory articles and also link to previous
            <AppLink class="inline-block" to="/speaking">
              talks and podcast episodes
            </AppLink>.
            Also, the <AppLink to="https://github.com/manniL/lichter.io/">code of the site</AppLink> is open-source.
          </p>

          <p>
            But you don't have to take my word for it. Here are some of my clients sharing their experiences.
          </p>

        </div>
        <div class="hidden lg:block w-full opacity-20 my-auto">
          <img class="w-full xl:w-2/3 mx-auto" src="/img/logo/glyph-white-colored.svg" />
          <img class="w-full xl:w-2/3 mx-auto" src="/img/logo/word-white-colored.svg" />
        </div>
      </div>
      <div class="mt-8">
        <AppParagraph look="heading" class="!text-4xl">Testimonials</AppParagraph>
        <div class="grid md:grid-cols-2 gap-8 mt-16">
          <LazyTestimonial person="Michael Müller" job="Business Leader of Software Engineering"
            image-link="/img/testimonials/michael-mueller.jpg">
            <p>
              I onboarded Alex to a legacy project that should be transformed into a modern web application.
              Within a short time, he was able to understand the domain and asked helpful questions regarding the current
              architecture. Eventually, we developed a roadmap for the project and Alex guided us when implementing the
              first features.
            </p><br>
            <p>
              This clearly proved to me that <span class="font-bold">Alex is a highly proficient Web Engineering
                Consultant</span>
              with deep knowledge of Vue.js and Nuxt.js.
            </p>
            <br>
            <p>
              To sum it up: His clear communication, dedication, deep technical understanding,
              and teamwork capabilities make him invaluable to any web development project.
              I am looking forward to collaborating with Alex again in the future.
            </p>
          </LazyTestimonial>
          <LazyTestimonial person="Christopher H. Stappert" job="Engineering Manager at intrinsify"
            image-link="/img/testimonials/christopher-stappert.jpg">
            <p class="font-bold">
              Alexander Lichter is a problem solver for every programming task.
            </p><br>
            <p>
              His deep technical insights, particularly in
              Vue and Nuxt, were instrumental in helping us build a robust, fast and scaleable application. If you have
              the
              pleasure of working with him, you will get a masterful engineer with an excellent record of field
              experience.
            </p>
            <br>
            <p>
              He can keep up fast on every level and always comes up with a solution or idea to work on. His clear mind
              will
              give you principles to enhance your project - no matter if you want to discuss TypeScript or architectural
              concerns.
            </p>
            <br>
            <p>
              And a personal note: You'll have a lot of fun to work with Alex. His kindness and endurance are remarkable.
              He's always willing to lend a hand and go the extra mile to ensure things get done right.
            </p>
          </LazyTestimonial>
          <LazyTestimonial person="Marcel Golob" job="Managing Director at Vinspire GmbH"
            image-link="/img/testimonials/marcel-golob.jpg">
            <p>
              I have been working with Alexander Lichter for the past year and I can honestly say that that he is
              one of the best software consultants out there.
            </p>
            <br>
            <p>
              He has been incredibly helpful to create solid and reliable software platforms.
            </p>
            <br>
            <p>Especially when it comes to Nuxt 3!</p>
            <br>
            <p class="font-bold">I can only recommend working with him.</p>
          </LazyTestimonial>
          <LazyTestimonial person="Pascal Prellwitz" job="Lead Developer at OnlineLessons.tv GmbH"
            image-link="/img/testimonials/pascal-prellwitz.jpg">
            <p class="font-bold">
              Collaborating with Alexander Lichter has been an absolute game-changer for our team.
            </p>
            <br>
            <p>
              When we found ourselves in a bind, Alex stepped in as our problem solver for our Nuxt 2 project.
              After solving the initial issues, we kept in contact and Alex has been a guiding star for the project ever
              since.
            </p>
            <br>
            <p>
              From discussing architecture for new features over diving into legacy code to fixing bugs and improving
              performance, Alex has been a tremendous help and I can wholeheartedly recommend working with him.
            </p>
          </LazyTestimonial>
        </div>
      </div>
    </AppSection>
  </div>
</template>