import { PolicyLayout, SafeHTML } from '@/components/PolicyLayout'

interface DMCAContent {
  content: string
}

async function getDMCAContent(): Promise<DMCAContent> {
  // This is a placeholder. In a real application, you would fetch this data from your API
  return {
    content: `
      <h2>DMCA Policy</h2>
      <p>GameGrid respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act of 1998, the text of which may be found on the U.S. Copyright Office website at http://www.copyright.gov/legislation/dmca.pdf, GameGrid will respond expeditiously to claims of copyright infringement committed using the GameGrid service that are reported to GameGrid's Designated Copyright Agent identified in the sample notice below.</p>
      <h3>DMCA Notice of Alleged Infringement ("Notice")</h3>
      <p>If you are a copyright owner, authorized to act on behalf of one, or authorized to act under any exclusive right under copyright, please report alleged copyright infringements taking place on or through the Site by completing the following DMCA Notice of Alleged Infringement and delivering it to GameGrid's Designated Copyright Agent.</p>
      <h3>DMCA Notice of Alleged Infringement ("Notice")</h3>
      <ol>
        <li>Identify the copyrighted work that you claim has been infringed, or - if multiple copyrighted works are covered by this Notice - you may provide a representative list of the copyrighted works that you claim have been infringed.</li>
        <li>Identify the material or link you claim is infringing (or the subject of infringing activity) and that access to which is to be disabled, including at a minimum, if applicable, the URL of the link shown on the Site where such material may be found.</li>
        <li>Provide your mailing address, telephone number, and, if available, email address.</li>
        <li>Include both of the following statements in the body of the Notice:
          <ul>
            <li>"I hereby state that I have a good faith belief that the disputed use of the copyrighted material is not authorized by the copyright owner, its agent, or the law (e.g., as a fair use)."</li>
            <li>"I hereby state that the information in this Notice is accurate and, under penalty of perjury, that I am the owner, or authorized to act on behalf of the owner, of the copyright or of an exclusive right under the copyright that is allegedly infringed."</li>
          </ul>
        </li>
        <li>Provide your full legal name and your electronic or physical signature.</li>
      </ol>
      <p>Deliver this Notice, with all items completed, to GameGrid's Designated Copyright Agent:</p>
      <p>Copyright Agent<br>
      GameGrid Inc.<br>
      123 Gaming Street, Pixel City, 12345<br>
      copyright@gamegrid.com</p>
    `
  }
}

export default async function DMCAPage() {
  const { content } = await getDMCAContent()

  return (
    <PolicyLayout title="DMCA Policy">
      <div className="prose prose-invert max-w-none">
        <SafeHTML html={content} />
      </div>
    </PolicyLayout>
  )
}