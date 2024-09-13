'use client'

import { Button } from "@/components/ui/button"
import { EnvelopeOpenIcon } from "@radix-ui/react-icons"

export default function EmailButton() {
    const handleEmailClick = () => {
        const email = "arfazhussain@uvic.ca"
        const subject = "Hey Arfaz, Let's Connect!"
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`
    }

    return (
        <Button
            variant="secondary"
            size="sm"
            onClick={handleEmailClick}
        >
            <EnvelopeOpenIcon className="mr-2 h-4 w-4" />
            Send me an Email
        </Button>
    )
}