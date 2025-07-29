import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
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
            <CardTitle className="text-3xl font-bold">
              Terms of Service
            </CardTitle>
            <p className="text-muted-foreground">Last updated: 28/07/2025</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">
                1. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using Fileforge, you accept and agree to be
                bound by the terms and provision of this agreement.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">
                2. Service Description
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Fileforge provides file processing services including encoding,
                decoding, and file conversion operations. We reserve the right
                to modify or discontinue the service at any time without notice.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">
                3. User Responsibilities
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>You agree to:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Use the service only for lawful purposes</li>
                  <li>
                    Not upload malicious, copyrighted, or inappropriate content
                  </li>
                  <li>
                    Not attempt to reverse engineer or exploit the service
                  </li>
                  <li>Respect the intellectual property rights of others</li>
                </ul>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">
                4. File Processing and Storage
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Files uploaded to Fileforge are processed temporarily and are
                not permanently stored on our servers. We recommend keeping
                backups of your original files.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">
                5. Limitation of Liability
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Fileforge is provided "as is" without warranties of any kind. We
                shall not be liable for any damages arising from the use of our
                service, including but not limited to data loss or service
                interruptions.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to terminate or suspend access to our
                service immediately, without prior notice, for any reason
                whatsoever, including breach of these Terms.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">
                7. Changes to Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. Changes
                will be effective immediately upon posting on this page.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">
                8. Contact Information
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please
                contact us at{" "}
                <a
                  href="mailto:legal@fileforge.com"
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
