"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from 'next/dynamic';
import { getAllPages, getContactInfo, getPageContent, updatePage, upsertContactInfo } from "@/lib/controllers/dynamicPages";
import { PlusCircle, Trash2 } from 'lucide-react';
import { ContactInfo } from "@/app/(dashboard)/pages/contacts/page";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const saveContent = async (page: string, content: string) => {
  const data = await updatePage(page, content);
  return new Promise(resolve => setTimeout(resolve, 1000));
};

const htmlSuggestions = [
  { label: '<h1>', insertText: '<h1>$1</h1>' },
  { label: '<p>', insertText: '<p>$1</p>' },
  { label: '<a>', insertText: '<a href="$1">$2</a>' },
  { label: '<ul>', insertText: '<ul>\n  <li>$1</li>\n</ul>' },
  { label: '<ol>', insertText: '<ol>\n  <li>$1</li>\n</ol>' },
  { label: '<strong>', insertText: '<strong>$1</strong>' },
  { label: '<em>', insertText: '<em>$1</em>' },
  { label: '<img>', insertText: '<img src="$1" alt="$2" />' },
  { label: '<div>', insertText: '<div>\n  $1\n</div>' },
  { label: '<span>', insertText: '<span>$1</span>' },
];

const initialContactInfo: ContactInfo = {
  id: 1,
  title: "Contact Information",
  description: "Get in touch with us using the information below.",
  address: '123 Gaming Street, Pixel City, 12345',
  email: 'support@gamegrid.com',
  phone: '+1 (555) 123-4567',
  formTitle: "Get in Touch",
  formDescription: "We'd love to hear from you. Please fill out this form and we'll get back to you as soon as possible.",
  socialTitle: "Follow Us",
  socialLinks: [
    { platform: 'facebook', url: 'https://facebook.com/gamegrid' },
    { platform: 'twitter', url: 'https://twitter.com/gamegrid' },
    { platform: 'instagram', url: 'https://instagram.com/gamegrid' },
  ]
};

export default function PolicyEditorPage() {
  const [selectedPage, setSelectedPage] = useState("about");
  const [pageContents, setPageContents] = useState<{[key: string]: string}>({
    "about": "",
    "contact": "",
    "cookies": "",
    "dmca": "",
    "terms": "",
    "privacy": ""
  });
  const [contactInfo, setContactInfo] = useState<ContactInfo>(initialContactInfo);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
  
    try {
      if (selectedPage === "contact") {
        await upsertContactInfo(contactInfo);
      } else {
        await saveContent(selectedPage, pageContents[selectedPage]);
      }
    } catch (error) {
      console.error(
        selectedPage === "contact"
          ? `Failed to update contacts: ${error}`
          : `Failed to save content: ${error}`
      );
    } finally {
      setIsSaving(false);
    }
  };  

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setPageContents(prev => ({
        ...prev,
        [selectedPage]: value
      }));
    }
  };

  const handleContactInfoChange = (field: keyof ContactInfo, value: string) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialLinkChange = (index: number, field: 'platform' | 'url', value: string) => {
    setContactInfo(prev => {
      const newLinks = [...prev.socialLinks];
      newLinks[index] = { ...newLinks[index], [field]: value };
      return { ...prev, socialLinks: newLinks };
    });
  };

  const addSocialLink = () => {
    setContactInfo(prev => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: '', url: '' }]
    }));
  };

  const removeSocialLink = (index: number) => {
    setContactInfo(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index)
    }));
  };

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const pages = await getAllPages();
        const contents: { [key: string]: string } = {};
        pages.forEach((page: { slug: string; content: string }) => {
          contents[page.slug] = page.content;
        });
        setPageContents(contents);
        const contacts = await getContactInfo();
        if (contacts.title) {
          setContactInfo(contacts);
        }
      } catch (error) {
        console.error("Error fetching pages:", error);
      }
    };

    fetchPages();
  }, [])

  return (
    <div className="space-y-6 p-6 bg-white">
      <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
        Policy Page Editor
      </h1>

      <Card className="bg-gray-50 border-none">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">
            Edit Policy Pages
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="page-select">Select Page to Edit</Label>
              <Select value={selectedPage} onValueChange={setSelectedPage}>
                <SelectTrigger id="page-select">
                  <SelectValue placeholder="Select a page" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="about">About Us</SelectItem>
                  <SelectItem value="contact">Contact Us</SelectItem>
                  <SelectItem value="cookies">Cookies Policy</SelectItem>
                  <SelectItem value="dmca">DMCA Policy</SelectItem>
                  <SelectItem value="terms">Terms of Service</SelectItem>
                  <SelectItem value="privacy">Privacy Policy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {selectedPage === "contact" ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={contactInfo.title}
                      onChange={(e) => handleContactInfoChange('title', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="formTitle">Form Title</Label>
                    <Input
                      id="formTitle"
                      value={contactInfo.formTitle}
                      onChange={(e) => handleContactInfoChange('formTitle', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={contactInfo.description}
                    onChange={(e) => handleContactInfoChange('description', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="formDescription">Form Description</Label>
                  <Textarea
                    id="formDescription"
                    value={contactInfo.formDescription}
                    onChange={(e) => handleContactInfoChange('formDescription', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={contactInfo.address}
                      onChange={(e) => handleContactInfoChange('address', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={contactInfo.email}
                      onChange={(e) => handleContactInfoChange('email', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={contactInfo.phone}
                      onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="socialTitle">Social Media Title</Label>
                  <Input
                    id="socialTitle"
                    value={contactInfo.socialTitle}
                    onChange={(e) => handleContactInfoChange('socialTitle', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Social Media Links</Label>
                  {contactInfo.socialLinks.map((link, index) => (
                    <div key={index} className="flex space-x-2">
                      <Input
                        placeholder="Platform"
                        value={link.platform}
                        onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                      />
                      <Input
                        placeholder="URL"
                        value={link.url}
                        onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeSocialLink(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={addSocialLink}
                    className="w-full"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Social Link
                  </Button>
                </div>
              </div>
            ) : (
              <Tabs defaultValue="edit" className="w-full">
                <TabsList>
                  <TabsTrigger value="edit">Edit</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="edit">
                  <div className="h-[600px] border rounded-md overflow-hidden">
                    <MonacoEditor
                      height="100%"
                      defaultLanguage="html"
                      theme="vs-dark"
                      value={pageContents[selectedPage]}
                      onChange={handleEditorChange}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        wordWrap: 'on',
                        suggestOnTriggerCharacters: true,
                        quickSuggestions: true,
                      }}
                      beforeMount={(monaco) => {
                        monaco.languages.setLanguageConfiguration('html', {
                          autoClosingPairs: [
                            { open: '<', close: '>' },
                            { open: '"', close: '"' },
                            { open: "'", close: "'" }
                          ],
                          brackets: [
                            ['<', '>']
                          ]
                        });
                        monaco.languages.registerCompletionItemProvider('html', {
                          provideCompletionItems: (model, position) => {
                            const suggestions = htmlSuggestions.map((item) => ({
                              label: item.label,
                              kind: monaco.languages.CompletionItemKind.Snippet,
                              insertText: item.insertText,
                              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                              range: {
                                startLineNumber: position.lineNumber,
                                startColumn: position.column,
                                endLineNumber: position.lineNumber,
                                endColumn: position.column
                              }
                            }));
            
                            return {
                              suggestions: suggestions,
                              incomplete: false
                            };
                          }
                        });
                      }}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="preview">
                  <div className="border p-4 h-[600px] overflow-auto prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: pageContents[selectedPage] }} />
                  </div>
                </TabsContent>
              </Tabs>
            )}
          <Button
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}