"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronUp, Pencil, Trash2 } from 'lucide-react';
import { UserList } from "@/components/admin/UserList";
import { listAllUsers, promoteUser } from "@/lib/controllers/users";
import { getMeta, insertMeta } from "@/lib/controllers/meta";
import { getAdSettings, updateAdSettings } from "@/lib/controllers/ads";
import { toast, Toaster } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdTypeSettings } from '@/components/AdTypeSettings';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface AdSettings {
  id?: number;
  google_client_id: string;
  carousel_ad_frequency: number;
  carousel_ad_slot: string;
  carousel_ad_format: string;
  carousel_ad_full_width: boolean;
  sidebar_ad_slot: string;
  sidebar_ad_format: string;
  sidebar_ad_full_width: boolean;
  game_view_ad_slot: string;
  game_view_ad_format: string;
  game_view_ad_full_width: boolean;
  comment_section_ad_slot: string;
  comment_section_ad_format: string;
  comment_section_ad_full_width: boolean;
  show_carousel_ads: boolean;
  show_sidebar_ads: boolean;
  show_game_view_ads: boolean;
  show_comment_section_ads: boolean;
  sidebar_ad_count: number;
}

interface SavedScript {
  id: string;
  name: string;
  element: string;
  position: string;
  script: string;
}

export default function SettingsPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showUserList, setShowUserList] = useState(false);
  const [showAdSettings, setShowAdSettings] = useState(false);
  const [isMetadataModified, setIsMetadataModified] = useState(false);
  const [showAdSenseSettings, setShowAdSenseSettings] = useState(false);
  const [adSenseScript, setAdSenseScript] = useState("");
  const [adSenseScriptName, setAdSenseScriptName] = useState("");
  const [adSenseTargetElement, setAdSenseTargetElement] = useState("");
  const [adSenseInjectionPosition, setAdSenseInjectionPosition] = useState("before");
  const [savedScripts, setSavedScripts] = useState<SavedScript[]>([]);
  const [editingScript, setEditingScript] = useState<SavedScript | null>(null);
  const [reload, setReload] = useState(false);

  const [siteTitle, setSiteTitle] = useState("");
  const [siteDescription, setSiteDescription] = useState("");

  const [adSettings, setAdSettings] = useState<AdSettings>({
    google_client_id: "",
    carousel_ad_frequency: 5,
    carousel_ad_slot: "",
    carousel_ad_format: "auto",
    carousel_ad_full_width: true,
    sidebar_ad_slot: "",
    sidebar_ad_format: "auto",
    sidebar_ad_full_width: false,
    game_view_ad_slot: "",
    game_view_ad_format: "auto",
    game_view_ad_full_width: true,
    comment_section_ad_slot: "",
    comment_section_ad_format: "auto",
    comment_section_ad_full_width: true,
    show_carousel_ads: true,
    show_sidebar_ads: true,
    show_game_view_ads: true,
    show_comment_section_ads: true,
    sidebar_ad_count: 2
  });

  useEffect(() => {
    async function fetchUsers() {
      const result = await listAllUsers(currentPage);
      if ('error' in result) {
        console.error(result.error);
      } else {
        const users = result.users;
        const total = result.total;
        setUsers(users);
        setTotalPages(total);
      }
    }
    fetchUsers();
  }, [currentPage, reload]);

  useEffect(() => {
    const fetch = async () => {
      const {data, error} = await getMeta();
      if (error) {
        toast.error('Error fetching site metadata');
      }
      if (data !== null && !isMetadataModified) {
        setSiteTitle(data.site_name);
        setSiteDescription(data.description);
      }
      setIsMetadataModified(false);
    }
    fetch();
  }, [isMetadataModified]);

  useEffect(() => {
    const fetchAdSettings = async () => {
      const { data, error } = await getAdSettings();
      if (error) {
        if (error.code === 'PGRST116') {
          toast.error('No settings created yet!');
        } else {
          toast.error('Error fetching ad settings');
        }
      }
      if (data !== null) {
        setAdSettings(data);
      }
    }
    fetchAdSettings();
  }, []);

  const handleDeleteUser = async (id: string) => {
    const result = await listAllUsers(currentPage);
    if ('error' in result) {
      console.error(result.error);
    } else {
      setUsers(result.users);
      setTotalPages(result.total);
    }
  };

  const handlePromoteUser = async (id: string) => {
    const res = await promoteUser(id);
    setReload(!reload);
    if (!res.success) {
      console.error(res.message);
    }
  };

  const saveSiteMeta = async () => {
    const res = await insertMeta(siteTitle, siteDescription);
    if (res.error) {
      console.error(`error inserting metadata: ${res.error}`)
    }

    toast.success(`Site meta saved successfully`);
    setReload(!reload);
  };

  const saveAdSettings = async () => {
    const res = await updateAdSettings(adSettings);
    if (res.error) {
      console.error(`error updating ad settings: ${res.error}`);
      toast.error('Error updating ad settings');
    } else {
      toast.success('Ad settings saved successfully');
    }
  };

  const saveAdSenseScript = async () => {
    // This is a dummy function for demonstration purposes
    // In a real application, you would save this to your Supabase table
    const newScript: SavedScript = {
      id: Date.now().toString(),
      name: adSenseScriptName,
      element: adSenseTargetElement,
      position: adSenseInjectionPosition,
      script: adSenseScript
    };
    setSavedScripts([...savedScripts, newScript]);
    toast.success("Successfully saved the script");
    
    // Reset form fields
    setAdSenseScriptName("");
    setAdSenseScript("");
    setAdSenseTargetElement("");
    setAdSenseInjectionPosition("before");
  };

  const updateSavedScript = (updatedScript: SavedScript) => {
    setSavedScripts(savedScripts.map(script => 
      script.id === updatedScript.id ? updatedScript : script
    ));
    setEditingScript(null);
    toast.success("Successfully updated the script");
  };

  const deleteSavedScript = (id: string) => {
    setSavedScripts(savedScripts.filter(script => script.id !== id));
    toast.success("Successfully deleted the script");
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
        Settings
      </h1>

      {/* General Settings */}
      <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            General Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="site-title" className="text-gray-700">Site Name</Label>
            <Input
              id="site-title"
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              placeholder="Enter your site name"
              className="border-gray-300"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="site-description" className="text-gray-700">Site Description</Label>
            <Textarea
              id="site-description"
              value={siteDescription}
              onChange={(e) => {setSiteDescription(e.target.value)}}
              placeholder="Enter your site description"
              className="border-gray-300"
            />
          </div>
          <Button
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
            onClick={async () => {await saveSiteMeta(); setIsMetadataModified(true)}}
          >
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* User Management */}
      <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader
          className="cursor-pointer flex flex-row items-center justify-between"
          onClick={() => setShowUserList(!showUserList)}
        >
          <CardTitle className="text-xl font-semibold text-gray-800">
            User Management
          </CardTitle>
          {showUserList ? (
            <ChevronUp className="text-gray-600" />
          ) : (
            <ChevronDown className="text-gray-600" />
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Manage users and their access levels.
          </p>
          {showUserList && (
            <UserList
              users={users}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              onDelete={handleDeleteUser}
              onPromote={handlePromoteUser}
            />
          )}
        </CardContent>
      </Card>

      {/* AdSense Script Management */}
      <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader
          className="cursor-pointer flex flex-row items-center justify-between"
          onClick={() => setShowAdSenseSettings(!showAdSenseSettings)}
        >
          <CardTitle className="text-xl font-semibold text-gray-800">
            AdSense Script Management
          </CardTitle>
          {showAdSenseSettings ? (
            <ChevronUp className="text-gray-600" />
          ) : (
            <ChevronDown className="text-gray-600" />
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {showAdSenseSettings && (
            <>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="adsense-name" className="text-gray-700">Script Name</Label>
                <Input
                  id="adsense-name"
                  value={adSenseScriptName}
                  onChange={(e) => setAdSenseScriptName(e.target.value)}
                  placeholder="Enter a name for this script"
                  className="border-gray-300"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="adsense-target" className="text-gray-700">Target Element</Label>
                <Input
                  id="adsense-target"
                  value={adSenseTargetElement}
                  onChange={(e) => setAdSenseTargetElement(e.target.value)}
                  placeholder="Enter target element (e.g., <div>, <h1>)"
                  className="border-gray-300"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="adsense-position" className="text-gray-700">Injection Position</Label>
                <Select
                  value={adSenseInjectionPosition}
                  onValueChange={(value) => setAdSenseInjectionPosition(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select injection position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="before">Before</SelectItem>
                    <SelectItem value="after">After</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="adsense-script" className="text-gray-700">AdSense Script</Label>
                <Textarea
                  id="adsense-script"
                  value={adSenseScript}
                  onChange={(e) => setAdSenseScript(e.target.value)}
                  placeholder="Paste your AdSense script here"
                  className="border-gray-300 min-h-[150px]"
                />
              </div>
              <Button
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                onClick={saveAdSenseScript}
              >
                Save AdSense Script
              </Button>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Saved Scripts</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Target Element</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {savedScripts.map((script) => (
                      <TableRow key={script.id}>
                        <TableCell>{script.name}</TableCell>
                        <TableCell>{script.element}</TableCell>
                        <TableCell>{script.position}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Pencil className="h-4 w-4 mr-2" />
                                  Edit
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Edit Script</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-name" className="text-right">
                                      Name
                                    </Label>
                                    <Input
                                      id="edit-name"
                                      value={script.name}
                                      onChange={(e) => setEditingScript({...script, name: e.target.value})}
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-element" className="text-right">
                                      Element
                                    </Label>
                                    <Input
                                      id="edit-element"
                                      value={script.element}
                                      onChange={(e) => setEditingScript({...script, element: e.target.value})}
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-position" className="text-right">
                                      Position
                                    </Label>
                                    <Select
                                      value={script.position}
                                      onValueChange={(value) => setEditingScript({...script, position: value})}
                                    >
                                      <SelectTrigger className="col-span-3">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="before">Before</SelectItem>
                                        <SelectItem value="after">After</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-script" className="text-right">
                                      Script
                                    </Label>
                                    <Textarea
                                      id="edit-script"
                                      value={script.script}
                                      onChange={(e) => setEditingScript({...script, script: e.target.value})}
                                      className="col-span-3"
                                    />
                                  </div>
                                </div>
                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline" onClick={() => setEditingScript(null)}>
                                    Cancel
                                  </Button>
                                  <Button onClick={() => updateSavedScript(script)}>
                                    Save Changes
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteSavedScript(script.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Ad Management */}
      <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader
          className="cursor-pointer flex flex-row items-center justify-between"
          onClick={() => setShowAdSettings(!showAdSettings)}
        >
          <CardTitle className="text-xl font-semibold text-gray-800">
            Ad Management
          </CardTitle>
          {showAdSettings ? (
            <ChevronUp className="text-gray-600" />
          ) : (
            <ChevronDown className="text-gray-600" />
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {showAdSettings && (
            <>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="google_client_id" className="text-gray-700">Google Client ID</Label>
                <Input
                  id="google_client_id"
                  value={adSettings.google_client_id}
                  onChange={(e) => setAdSettings({...adSettings, google_client_id: e.target.value})}
                  placeholder="Enter your Google Client ID"
                  className="border-gray-300"
                />
              </div>

              <AdTypeSettings
                adType="carousel"
                settings={{
                  show: adSettings.show_carousel_ads,
                  slot: adSettings.carousel_ad_slot,
                  format: adSettings.carousel_ad_format,
                  fullWidth: adSettings.carousel_ad_full_width,
                  frequency: adSettings.carousel_ad_frequency,
                }}
                onSettingsChange={(newSettings) => setAdSettings({
                  ...adSettings,
                  show_carousel_ads: newSettings.show,
                  carousel_ad_slot: newSettings.slot,
                  carousel_ad_format: newSettings.format,
                  carousel_ad_full_width: newSettings.fullWidth,
                  carousel_ad_frequency: newSettings.frequency,
                })}
              />

              <AdTypeSettings
                adType="sidebar"
                settings={{
                  show: adSettings.show_sidebar_ads,
                  slot: adSettings.sidebar_ad_slot,
                  format: adSettings.sidebar_ad_format,
                  fullWidth: adSettings.sidebar_ad_full_width,
                  count: adSettings.sidebar_ad_count,
                }}
                onSettingsChange={(newSettings) => setAdSettings({
                  ...adSettings,
                  show_sidebar_ads: newSettings.show,
                  sidebar_ad_slot: newSettings.slot,
                  sidebar_ad_format: newSettings.format,
                  sidebar_ad_full_width: newSettings.fullWidth,
                  sidebar_ad_count: newSettings.count,
                })}
              />

              <AdTypeSettings
                adType="gameView"
                settings={{
                  show: adSettings.show_game_view_ads,
                  slot: adSettings.game_view_ad_slot,
                  format: adSettings.game_view_ad_format,
                  fullWidth: adSettings.game_view_ad_full_width,
                }}
                onSettingsChange={(newSettings) => setAdSettings({
                  ...adSettings,
                  show_game_view_ads: newSettings.show,
                  game_view_ad_slot: newSettings.slot,
                  game_view_ad_format: newSettings.format,
                  game_view_ad_full_width: newSettings.fullWidth,
                })}
              />

              <AdTypeSettings
                adType="commentSection"
                settings={{
                  show: adSettings.show_comment_section_ads,
                  slot: adSettings.comment_section_ad_slot,
                  format: adSettings.comment_section_ad_format,
                  fullWidth: adSettings.comment_section_ad_full_width,
                }}
                onSettingsChange={(newSettings) => setAdSettings({
                  ...adSettings,
                  show_comment_section_ads: newSettings.show,
                  comment_section_ad_slot: newSettings.slot,
                  comment_section_ad_format: newSettings.format,
                  comment_section_ad_full_width: newSettings.fullWidth,
                })}
              />

              <Button
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                onClick={saveAdSettings}
              >
                Save Ad Settings
              </Button>
            </>
          )}
        </CardContent>
      </Card>
      <Toaster position="bottom-right" />
    </div>
  );
}