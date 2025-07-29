import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
            <p className="text-muted-foreground">Last updated: 28/07/2025</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">
                1. Information We Collect
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>We collect the following types of information:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>
                    <strong>Files:</strong> Files you upload for processing
                    (temporarily stored)
                  </li>
                  <li>
                    <strong>Usage Data:</strong> Information about how you use
                    our service
                  </li>
                  <li>
                    <strong>Technical Data:</strong> IP address, browser type,
                    and device information
                  </li>
                  <li>
                    <strong>Cookies:</strong> Small data files to improve your
                    experience
                  </li>
                </ul>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">
                2. How We Use Your Information
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>We use your information to:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Process and convert your files</li>
                  <li>Improve our service and user experience</li>
                  <li>Monitor usage and prevent abuse</li>
                  <li>Communicate with you about service updates</li>
                </ul>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">
                3. File Storage and Security
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Files uploaded to Fileforge are processed temporarily and
                automatically deleted after processing. We implement appropriate
                security measures to protect your data during processing, but
                cannot guarantee absolute security of data transmitted over the
                internet.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Data Sharing</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, trade, or share your personal information with
                third parties except as described in this policy. We may share
                information when required by law or to protect our rights and
                safety.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">
                5. Third-Party Services
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our service may use third-party analytics and hosting services.
                These services have their own privacy policies and we encourage
                you to review them.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Access information we have about you</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of certain data collection</li>
                </ul>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies to enhance your experience and analyze usage
                patterns. You can disable cookies in your browser settings,
                though this may affect service functionality.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">
                8. Changes to Privacy Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new policy on this page
                with an updated date.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please
                contact us at{" "}
                <a
                  href="mailto:privacy@fileforge.com"
                  className="text-primary hover:underline"
                >
                  support@fileforge.com
                </a>
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
