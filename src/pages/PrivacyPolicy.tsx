import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const PrivacyPolicy = () => {
    return (
        <>
            <Navbar />
            <div className="bg-codetales-dark min-h-screen text-codetales-white">
                <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6 text-codetales-pink">Privacy Policy</h1>

                    <div className="space-y-8">
                        {/* Introduction */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-3 text-codetales-pink">Introduction</h2>
                            <p className="mb-4">
                                Welcome to CodeTales. We respect your privacy and are committed to protecting your personal data.
                                This privacy policy will inform you about how we look after your personal data when you visit our website
                                and tell you about your privacy rights and how the law protects you.
                            </p>
                            <p>
                                Please read this privacy policy carefully before using our services.
                            </p>
                        </section>

                        {/* Information We Collect */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-3 text-codetales-pink">Information We Collect</h2>
                            <p className="mb-3">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                <li><span className="font-medium">Identity Data</span> includes first name, last name, username.</li>
                                <li><span className="font-medium">Contact Data</span> includes email address and telephone numbers.</li>
                                <li><span className="font-medium">Technical Data</span> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                                <li><span className="font-medium">Usage Data</span> includes information about how you use our website, products and services.</li>
                            </ul>
                        </section>

                        {/* How We Use Your Information */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-3 text-codetales-pink">How We Use Your Information</h2>
                            <p className="mb-3">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                <li>To register you as a new user</li>
                                <li>To provide and improve our services</li>
                                <li>To manage our relationship with you</li>
                                <li>To administer and protect our business and this website</li>
                                <li>To deliver relevant website content to you</li>
                            </ul>
                        </section>

                        {/* Data Security */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-3 text-codetales-pink">Data Security</h2>
                            <p>
                                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used,
                                or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those
                                employees, agents, contractors and other third parties who have a business need to know.
                            </p>
                        </section>

                        {/* Your Rights */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-3 text-codetales-pink">Your Rights</h2>
                            <p className="mb-3">Under certain circumstances, you have rights under data protection laws in relation to your personal data including:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-3 border border-codetales-pink rounded-md">
                                    <h3 className="font-medium mb-2">Right to Access</h3>
                                    <p className="text-sm">Request access to your personal data.</p>
                                </div>
                                <div className="p-3 border border-codetales-pink rounded-md">
                                    <h3 className="font-medium mb-2">Right to Rectification</h3>
                                    <p className="text-sm">Request correction of your personal data.</p>
                                </div>
                                <div className="p-3 border border-codetales-pink rounded-md">
                                    <h3 className="font-medium mb-2">Right to Erasure</h3>
                                    <p className="text-sm">Request erasure of your personal data.</p>
                                </div>
                                <div className="p-3 border border-codetales-pink rounded-md">
                                    <h3 className="font-medium mb-2">Right to Restrict Processing</h3>
                                    <p className="text-sm">Request restriction of processing your personal data.</p>
                                </div>
                            </div>
                        </section>

                        {/* Cookies */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-3 text-codetales-pink">Cookies</h2>
                            <p>
                                We use cookies to distinguish you from other users of our website, helping us provide you with a good experience
                                and allowing us to improve the site. By continuing to browse the site, you are agreeing to our use of cookies.
                            </p>
                        </section>

                        {/* Changes to Privacy Policy */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-3 text-codetales-pink">Changes to This Privacy Policy</h2>
                            <p>
                                We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy
                                on this page and updating the effective date below.
                            </p>
                        </section>

                        {/* Contact */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-3 text-codetales-pink">Contact Us</h2>
                            <p className="mb-4">
                                If you have any questions about this privacy policy, please contact us main developer:
                            </p>
                            <div className="bg-codetales-dark border border-codetales-pink rounded-lg p-4">
                                <p className="mb-2"><span className="font-medium">Email:</span> tigoypetercharles@outlook.com</p>
                            </div>
                        </section>

                        {/* Last updated */}
                        <div className="pt-6 border-t border-codetales-pink text-sm">
                            <p>Last updated: {new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
