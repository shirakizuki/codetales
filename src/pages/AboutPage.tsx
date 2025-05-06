import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const AboutPage = () => {
    return (
        <>
            <Navbar />
            <div className="p-4 w-full md:p-8 md:max-w-7xl md:mx-auto bg-codetales-dark text-codetales-white">
                <h1 className="text-3xl mb-6 text-codetales-pink text-center md:text-4xl font-bold">About Computer Science 3A</h1>

                <section className="mb-8">
                    <h2 className="text-xl mb-4 text-codetales-pink md:text-2xl">Our Mission</h2>
                    <p className="text-base leading-relaxed mb-4 text-codetales-white">
                        Computer Science 3A is dedicated to developing the next generation of software engineers and computer scientists.
                        We focus on building strong problem-solving skills, algorithmic thinking, and practical programming expertise that
                        prepare students for challenges in the tech industry and beyond.
                    </p>
                    <p className="text-base leading-relaxed mb-4 text-codetales-white">
                        We bridge theoretical knowledge with hands-on application, ensuring students can apply core concepts
                        in real-world computing environments.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl mb-4 text-codetales-pink md:text-2xl">Our Curriculum</h2>
                    <p className="text-base leading-relaxed mb-4 text-codetales-white">
                        Our program covers data structures, algorithm analysis, software design patterns,
                        and full-stack development. Students collaborate on projects that simulate
                        real-world software development using version control, agile methods,
                        and team programming.
                    </p>
                    <p className="text-base leading-relaxed mb-4 text-codetales-white">
                        Beyond technical knowledge, we emphasize critical thinking, problem-solving,
                        and communication skills essential for succeeding in technology careers.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl mb-4 text-codetales-pink md:text-2xl">Our Team</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="bg-codetales-dark p-6 rounded-lg shadow-md border border-codetales-pink">
                            <h3 className="text-lg mb-2 text-codetales-white font-semibold">Nathanael Larida</h3>
                            <p className="text-sm text-codetales-pink mb-3">Program Director</p>
                            <p className="text-base leading-relaxed mb-4 text-codetales-white">
                                With 12+ years in software engineering and education,
                                Prof. Johnson specializes in algorithms and system architecture.
                            </p>
                        </div>

                        <div className="bg-codetales-dark p-6 rounded-lg shadow-md border border-codetales-pink">
                            <h3 className="text-lg mb-2 text-codetales-white font-semibold">Matt Alexuis Y. Merano</h3>
                            <p className="text-sm text-codetales-pink mb-3">Lead Instructor</p>
                            <p className="text-base leading-relaxed mb-4 text-codetales-white">
                                Dr. Patel brings industry experience from her work at tech companies,
                                focusing on software development and database systems.
                            </p>
                        </div>

                        <div className="bg-codetales-dark p-6 rounded-lg shadow-md border border-codetales-pink">
                            <h3 className="text-lg mb-2 text-codetales-white font-semibold">Raj Tag-at</h3>
                            <p className="text-sm text-codetales-pink mb-3">Teaching Assistant</p>
                            <p className="text-base leading-relaxed mb-4 text-codetales-white">
                                A graduate researcher in Computer Science, James supports students with
                                coding challenges and provides guidance on programming concepts.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl mb-4 text-codetales-pink md:text-2xl">Our Approach</h2>
                    <p className="text-base leading-relaxed mb-4 text-codetales-white">
                        We believe in learning by doing. Our project-based curriculum encourages students to solve
                        real problems, make mistakes, iterate on solutions, and build resilience—qualities that
                        define successful software professionals.
                    </p>
                    <p className="text-base leading-relaxed mb-4 text-codetales-white">
                        Computer Science 3A serves as a stepping stone in our students' journey, connecting
                        fundamental principles with advanced topics they'll explore in future courses.
                    </p>
                </section>
            </div>
            <Footer />
        </>
    );
};
