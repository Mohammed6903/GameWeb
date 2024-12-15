// "use client";

// import React, { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { ChevronDown, ChevronUp } from 'lucide-react';
// import { UserList } from "@/components/admin/UserList";
// import { listAllUsers, promoteUser } from "@/lib/controllers/users";
// import { getMeta, insertMeta } from "@/lib/controllers/meta";
// import { toast } from "sonner";

// export default function SettingsPage() {
//   const [users, setUsers] = useState<any[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [showUserList, setShowUserList] = useState(false);
//   const [reload, setReload] = useState(false);

//   const [siteTitle, setSiteTitle] = useState("");
//   const [siteDescription, setSiteDescription] = useState("");

//   useEffect(() => {
//     async function fetchUsers() {
//       const result = await listAllUsers(currentPage);
//       if ('error' in result) {
//         console.error(result.error);
//       } else {
//         const users = result.users;
//         const total = result.total;
//         setUsers(users);
//         setTotalPages(total);
//       }
//     }
//     fetchUsers();
//   }, [currentPage, reload]);

//   const handleDeleteUser = async (id: string) => {
//     // Implement delete user logic here
//     // After successful deletion, refetch the current page
//     const result = await listAllUsers(currentPage);
//     if ('error' in result) {
//       console.error(result.error);
//     } else {
//       setUsers(result.users);
//       setTotalPages(result.total);
//     }
//   };

//   const handlePromoteUser = async (id: string) => {
//     const res = await promoteUser(id);
//     setReload(!reload);
//     if (!res.success) {
//       console.error(res.message);
//     }
//   };

//   const saveSiteMeta = async () => {
//     const res = await insertMeta(siteTitle, siteDescription);
//     if (res.error) {
//       console.error(`error inserting metadata: ${res.error}`)
//     }

//     toast(`Site meta saved successfully`);
//   };

//   useEffect(() => {
//     const fetch = async () => {
//       const {data, error} = await getMeta();
//       if (error) {
//         toast.error('Error fetching site metadata');
//       }
//       if (data !== null) {
//         setSiteTitle(data.site_name);
//         setSiteDescription(data.description);
//       }
//     }
//     fetch();
//   })

//   return (
//     <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
//       <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
//         Settings
//       </h1>

//       {/* General Settings */}
//       <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
//         <CardHeader>
//           <CardTitle className="text-xl font-semibold text-gray-800">
//             General Settings
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="flex flex-col space-y-2">
//             <Label htmlFor="site-title" className="text-gray-700">Site Name</Label>
//             <Input
//               id="site-title"
//               value={siteTitle}
//               onChange={(e) => setSiteTitle(e.target.value)}
//               placeholder="Enter your site name"
//               className="border-gray-300"
//             />
//           </div>
//           <div className="flex flex-col space-y-2">
//             <Label htmlFor="site-description" className="text-gray-700">Site Description</Label>
//             <Textarea
//               id="site-description"
//               value={siteDescription}
//               onChange={(e) => setSiteDescription(e.target.value)}
//               placeholder="Enter your site description"
//               className="border-gray-300"
//             />
//           </div>
//           <Button
//             className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
//             onClick={async () => await saveSiteMeta()}
//           >
//             Save Changes
//           </Button>
//         </CardContent>
//       </Card>

//       {/* User Management */}
//       <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
//         <CardHeader
//           className="cursor-pointer flex flex-row items-center justify-between"
//           onClick={() => setShowUserList(!showUserList)}
//         >
//           <CardTitle className="text-xl font-semibold text-gray-800">
//             User Management
//           </CardTitle>
//           {showUserList ? (
//             <ChevronUp className="text-gray-600" />
//           ) : (
//             <ChevronDown className="text-gray-600" />
//           )}
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <p className="text-gray-600">
//             Manage users and their access levels.
//           </p>
//           {showUserList && (
//             <UserList
//               users={users}
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={setCurrentPage}
//               onDelete={handleDeleteUser}
//               onPromote={handlePromoteUser}
//             />
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { UserList } from "@/components/admin/UserList";
import { listAllUsers, promoteUser } from "@/lib/controllers/users";
import { getMeta, insertMeta } from "@/lib/controllers/meta";
import { getAdSettings, updateAdSettings } from "@/lib/controllers/ads";
import { toast } from "sonner";

export interface AdSettings {
  googleClientId: string;
  carouselAdFrequency: number;
  carouselAdSlot: string;
  carouselAdFormat: string;
  carouselAdFullWidth: boolean;
  sidebarAdSlot: string;
  sidebarAdFormat: string;
  sidebarAdFullWidth: boolean;
  gameViewAdSlot: string;
  gameViewAdFormat: string;
  gameViewAdFullWidth: boolean;
  commentSectionAdSlot: string;
  commentSectionAdFormat: string;
  commentSectionAdFullWidth: boolean;
  showCarouselAds: boolean;
  showSidebarAds: boolean;
  showGameViewAds: boolean;
  showCommentSectionAds: boolean;
}

export default function SettingsPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showUserList, setShowUserList] = useState(false);
  const [showAdSettings, setShowAdSettings] = useState(false);
  const [isMetadataModified, setIsMetadataModified] = useState(false);
  const [reload, setReload] = useState(false);

  const [siteTitle, setSiteTitle] = useState("");
  const [siteDescription, setSiteDescription] = useState("");

  const [adSettings, setAdSettings] = useState<AdSettings>({
    googleClientId: "",
    carouselAdFrequency: 5,
    carouselAdSlot: "",
    carouselAdFormat: "auto",
    carouselAdFullWidth: true,
    sidebarAdSlot: "",
    sidebarAdFormat: "auto",
    sidebarAdFullWidth: false,
    gameViewAdSlot: "",
    gameViewAdFormat: "auto",
    gameViewAdFullWidth: true,
    commentSectionAdSlot: "",
    commentSectionAdFormat: "auto",
    commentSectionAdFullWidth: true,
    showCarouselAds: true,
    showSidebarAds: true,
    showGameViewAds: true,
    showCommentSectionAds: true,
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
        toast.error('Error fetching ad settings');
      }
      if (data !== null) {
        setAdSettings(data);
      }
    }
    fetchAdSettings();
  }, []);

  const handleDeleteUser = async (id: string) => {
    // Implement delete user logic here
    // After successful deletion, refetch the current page
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

    toast(`Site meta saved successfully`);
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
                <Label htmlFor="google-client-id" className="text-gray-700">Google Client ID</Label>
                <Input
                  id="google-client-id"
                  value={adSettings.googleClientId}
                  onChange={(e) => setAdSettings({...adSettings, googleClientId: e.target.value})}
                  placeholder="Enter your Google Client ID"
                  className="border-gray-300"
                />
              </div>

              {/* Carousel Ads */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-carousel-ads" className="text-gray-700">Show Carousel Ads</Label>
                  <Switch
                    id="show-carousel-ads"
                    checked={adSettings.showCarouselAds}
                    onCheckedChange={(checked) => setAdSettings({...adSettings, showCarouselAds: checked})}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="carousel-ad-frequency" className="text-gray-700">Carousel Ad Frequency</Label>
                  <Input
                    id="carousel-ad-frequency"
                    type="number"
                    value={adSettings.carouselAdFrequency}
                    onChange={(e) => setAdSettings({...adSettings, carouselAdFrequency: parseInt(e.target.value)})}
                    placeholder="Enter frequency"
                    className="border-gray-300"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="carousel-ad-slot" className="text-gray-700">Carousel Ad Slot</Label>
                  <Input
                    id="carousel-ad-slot"
                    value={adSettings.carouselAdSlot}
                    onChange={(e) => setAdSettings({...adSettings, carouselAdSlot: e.target.value})}
                    placeholder="Enter ad slot"
                    className="border-gray-300"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="carousel-ad-format" className="text-gray-700">Carousel Ad Format</Label>
                  <Input
                    id="carousel-ad-format"
                    value={adSettings.carouselAdFormat}
                    onChange={(e) => setAdSettings({...adSettings, carouselAdFormat: e.target.value})}
                    placeholder="Enter ad format"
                    className="border-gray-300"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="carousel-ad-full-width" className="text-gray-700">Carousel Ad Full Width</Label>
                  <Switch
                    id="carousel-ad-full-width"
                    checked={adSettings.carouselAdFullWidth}
                    onCheckedChange={(checked) => setAdSettings({...adSettings, carouselAdFullWidth: checked})}
                  />
                </div>
              </div>

              {/* Sidebar Ads */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-sidebar-ads" className="text-gray-700">Show Sidebar Ads</Label>
                  <Switch
                    id="show-sidebar-ads"
                    checked={adSettings.showSidebarAds}
                    onCheckedChange={(checked) => setAdSettings({...adSettings, showSidebarAds: checked})}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="sidebar-ad-slot" className="text-gray-700">Sidebar Ad Slot</Label>
                  <Input
                    id="sidebar-ad-slot"
                    value={adSettings.sidebarAdSlot}
                    onChange={(e) => setAdSettings({...adSettings, sidebarAdSlot: e.target.value})}
                    placeholder="Enter ad slot"
                    className="border-gray-300"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="sidebar-ad-format" className="text-gray-700">Sidebar Ad Format</Label>
                  <Input
                    id="sidebar-ad-format"
                    value={adSettings.sidebarAdFormat}
                    onChange={(e) => setAdSettings({...adSettings, sidebarAdFormat: e.target.value})}
                    placeholder="Enter ad format"
                    className="border-gray-300"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sidebar-ad-full-width" className="text-gray-700">Sidebar Ad Full Width</Label>
                  <Switch
                    id="sidebar-ad-full-width"
                    checked={adSettings.sidebarAdFullWidth}
                    onCheckedChange={(checked) => setAdSettings({...adSettings, sidebarAdFullWidth: checked})}
                  />
                </div>
              </div>

              {/* Game View Ads */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-game-view-ads" className="text-gray-700">Show Game View Ads</Label>
                  <Switch
                    id="show-game-view-ads"
                    checked={adSettings.showGameViewAds}
                    onCheckedChange={(checked) => setAdSettings({...adSettings, showGameViewAds: checked})}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="game-view-ad-slot" className="text-gray-700">Game View Ad Slot</Label>
                  <Input
                    id="game-view-ad-slot"
                    value={adSettings.gameViewAdSlot}
                    onChange={(e) => setAdSettings({...adSettings, gameViewAdSlot: e.target.value})}
                    placeholder="Enter ad slot"
                    className="border-gray-300"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="game-view-ad-format" className="text-gray-700">Game View Ad Format</Label>
                  <Input
                    id="game-view-ad-format"
                    value={adSettings.gameViewAdFormat}
                    onChange={(e) => setAdSettings({...adSettings, gameViewAdFormat: e.target.value})}
                    placeholder="Enter ad format"
                    className="border-gray-300"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="game-view-ad-full-width" className="text-gray-700">Game View Ad Full Width</Label>
                  <Switch
                    id="game-view-ad-full-width"
                    checked={adSettings.gameViewAdFullWidth}
                    onCheckedChange={(checked) => setAdSettings({...adSettings, gameViewAdFullWidth: checked})}
                  />
                </div>
              </div>

              {/* Comment Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-comment-section-ads" className="text-gray-700">Show Comment Section Ads</Label>
                  <Switch
                    id="show-comment-section-ads"
                    checked={adSettings.showCommentSectionAds}
                    onCheckedChange={(checked) => setAdSettings({...adSettings, showCommentSectionAds: checked})}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="comment-section-ad-slot" className="text-gray-700">Comment Section Ad Slot</Label>
                  <Input
                    id="comment-section-ad-slot"
                    value={adSettings.commentSectionAdSlot}
                    onChange={(e) => setAdSettings({...adSettings, commentSectionAdSlot: e.target.value})}
                    placeholder="Enter ad slot"
                    className="border-gray-300"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="comment-section-ad-format" className="text-gray-700">Comment Section Ad Format</Label>
                  <Input
                    id="comment-section-ad-format"
                    value={adSettings.commentSectionAdFormat}
                    onChange={(e) => setAdSettings({...adSettings, commentSectionAdFormat: e.target.value})}
                    placeholder="Enter ad format"
                    className="border-gray-300"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="comment-section-ad-full-width" className="text-gray-700">Comment Section Ad Full Width</Label>
                  <Switch
                    id="comment-section-ad-full-width"
                    checked={adSettings.commentSectionAdFullWidth}
                    onCheckedChange={(checked) => setAdSettings({...adSettings, commentSectionAdFullWidth: checked})}
                  />
                </div>
              </div>

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
    </div>
  );
}