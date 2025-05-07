import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const TermsUse = () => {
    return (
        <>
            <Navbar />
            <div className="bg-codetales-dark min-h-screen text-codetales-white">
                <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6 text-codetales-pink">Terms of Use</h1>

                    <div className="space-y-8">
                        {/* Introduction */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-3 text-codetales-pink">Introduction</h2>
                            <p className="mb-4">
                                Welcome to CodeTales. These Terms of Use govern your use of our website, services, and applications
                                (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.
                            </p>
                            <p>
                                Please read these Terms carefully before using our Services. If you do not agree with any part of these Terms,
                                you must not access or use our Services.
                            </p>
                        </section>

                        {/* Acceptance of Terms */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-3 text-codetales-pink">Acceptance of Terms</h2>
                            <p className="mb-4">
                                By accessing or using the Services, you confirm that:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                <li>You have read and understand these Terms</li>
                                <li>You are at least 18 years of age or have legal parental or guardian consent</li>
                                <li>You have the legal capacity to enter into binding agreements</li>
                                <li>You agree to be bound by these Terms</li>
                            </ul>
                        </section>

                        {/* User Accounts */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-3 text-codetales-pink">User Accounts</h2>
                            <p className="mb-3">
                                To access certain features of our Services, you may need to create an account. When creating an account:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                <li>You must provide accurate and complete information</li>
                                <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                                <li>You are responsible for all activities that occur under your account</li>
                                <li>You must notify us immediately of any unauthorized use of your account</li>
                            </ul>
                            <p>
                                We reserve the right to disable any user account at our sole discretion without notice or explanation.
                            </p>
                        </section>

                        {/* Intellectual Property */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-3 text-codetales-pink">Intellectual Property</h2>
                            <p className="mb-4">
                                All content on our Services, including but not limited to text, graphics, logos, icons, images, audio clips,
                                digital downloads, data compilations, and software, is the property of CodeTales or its content suppliers
                                and is protected by international copyright laws.
                            </p>
                            <div className="bg-codetales-dark border border-codetales-pink rounded-lg p-4 mb-4">
                                <p className="font-medium mb-2">You may not:</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Modify or copy the materials</li>
                                    <li>Use the materials for any commercial purpose</li>
                                    <li>Attempt to decompile or reverse engineer any software contained on our Services</li>
                                    <li>Remove any copyright or other proprietary notations from the materials</li>
                                    <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                                </ul>
                            </div>
                        </section>

                        {/* User Content */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-3 text-codetales-pink">User Content</h2>
                            <p className="mb-3">
                                Our Services may allow you to post, link, store, share and otherwise make available certain content.
                                By providing content to our Services:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                <li>You grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute your content</li>
                                <li>You represent and warrant that you own or have the necessary rights to such content</li>
                                <li>You understand that all content you post may be viewed by other users</li>
                                <li>You agree not to post content that violates any third-party rights or these Terms</li>
                            </ul>
                        </section>

                        {/* Prohibited Uses */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-3 text-codetales-pink">Prohibited Uses</h2>
                            <p className="mb-3">You may use our Services only for lawful purposes and in accordance with these Terms. You agree not to use our Services:</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="p-3 border border-codetales-pink rounded-md">
                                    <h3 className="font-medium mb-2">Illegal Activities</h3>
                                    <p className="text-sm">In any way that violates any applicable federal, state, local, or international law or regulation.</p>
                                </div>
                                <div className="p-3 border border-codetales-pink rounded-md">
                                    <h3 className="font-medium mb-2">Harmful Content</h3>
                                    <p className="text-sm">To transmit or procure the sending of any advertising or promotional material, including "spam," or any other form of unauthorized solicitation.</p>
                                </div>
                                <div className="p-3 border border-codetales-pink rounded-md">
                                    <h3 className="font-medium mb-2">System Interference</h3>
                                    <p className="text-sm">To impair or disrupt the website or any servers or networks connected to the website.</p>
                                </div>
                                <div className="p-3 border border-codetales-pink rounded-md">
                                    <h3 className="font-medium mb-2">Data Collection</h3>
                                    <p className="text-sm">To engage in any data mining, data harvesting, data extracting, or similar activity in connection with the website.</p>
                                </div>
                            </div>
                        </section>

                        {/* Termination */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-3 text-codetales-pink">Termination</h2>
                            <p className="mb-4">
                                We may terminate or suspend your account and access to our Services immediately, without prior notice or liability,
                                for any reason whatsoever, including without limitation if you breach these Terms.
                            </p>
                            <p>
                                Upon termination, your right to use the Services will immediately cease.
                                All provisions of the Terms which by their nature should survive termination shall survive,
                                including without limitation: ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                            </p>
                        </section>

                        {/* Limitation of Liability */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-3 text-codetales-pink">Limitation of Liability</h2>
                            <p className="mb-4">
                                In no event shall CodeTales, its officers, directors, employees, or agents, be liable to you for any direct, indirect,
                                incidental, special, punitive, or consequential damages whatsoever resulting from:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                <li>Your use or inability to use our Services</li>
                                <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
                                <li>Any interruption or cessation of transmission to or from our Services</li>
                                <li>Any bugs, viruses, or other harmful code that may be transmitted through our Services</li>
                                <li>Any content or conduct of any third party on our Services</li>
                            </ul>
                        </section>

                        {/* Governing Law */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-3 text-codetales-pink">Governing Law</h2>
                            <p>
                                These Terms shall be governed and construed in accordance with the laws of the United States of America,
                                without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms
                                will not be considered a waiver of those rights.
                            </p>
                        </section>

                        {/* Changes to Terms */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-3 text-codetales-pink">Changes to Terms</h2>
                            <p className="mb-4">
                                We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
                                By continuing to access or use our Services after those revisions become effective,
                                you agree to be bound by the revised terms.
                            </p>
                            <p>
                                It is your responsibility to review these Terms periodically for changes.
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
