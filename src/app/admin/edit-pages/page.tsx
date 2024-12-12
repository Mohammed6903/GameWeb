"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from 'next/dynamic';

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

// This is a mock function to simulate saving data to the server
const saveContent = async (page: string, content: string) => {
  console.log(`Saving ${page} content:`, content);
  // In a real application, you would make an API call here
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
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveContent(selectedPage, pageContents[selectedPage]);
      // You could add additional success handling here if needed
    } catch (error) {
      console.error("Failed to save content:", error);
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

          <Button
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>

      {/* Rest of the components remain the same */}
      <Card className="bg-gray-50 border-none">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">
            Policy Page Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Manage visibility and URLs for policy pages.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline">Manage Page Visibility</Button>
            <Button variant="outline">Edit Page URLs</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-50 border-none">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">
            Version History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            View and restore previous versions of policy pages.
          </p>
          <Button variant="outline">View Version History</Button>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
          Publish All Changes
        </Button>
      </div>
    </div>
  );
}