import { PolicyLayout } from '@/components/PolicyLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface ContactInfo {
  address: string
  email: string
  phone: string
}

async function getContactInfo(): Promise<ContactInfo> {
  // This is a placeholder. In a real application, you would fetch this data from your API
  return {
    address: '123 Gaming Street, Pixel City, 12345',
    email: 'support@gamegrid.com',
    phone: '+1 (555) 123-4567'
  }
}

export default async function ContactPage() {
  const contactInfo = await getContactInfo()

  return (
    <PolicyLayout title="Contact Us">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="mb-4">We'd love to hear from you. Please fill out this form and we'll get back to you as soon as possible.</p>
          <form className="space-y-4">
            <Input placeholder="Your Name" className="bg-white/5 border-purple-700 focus:border-purple-500" />
            <Input type="email" placeholder="Your Email" className="bg-white/5 border-purple-700 focus:border-purple-500" />
            <Textarea placeholder="Your Message" className="bg-white/5 border-purple-700 focus:border-purple-500 min-h-[150px]" />
            <Button type="submit" className="w-full bg-purple-700 hover:bg-purple-800">Send Message</Button>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <div className="space-y-4">
            <p><strong>Address:</strong> {contactInfo.address}</p>
            <p><strong>Email:</strong> {contactInfo.email}</p>
            <p><strong>Phone:</strong> {contactInfo.phone}</p>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {/* Add social media icons/links here */}
            </div>
          </div>
        </div>
      </div>
    </PolicyLayout>
  )
}