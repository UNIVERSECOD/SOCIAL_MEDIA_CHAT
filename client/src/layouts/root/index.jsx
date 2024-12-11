import { Navigate, Outlet } from "react-router-dom";
import React, { useEffect } from "react";

import { MobileNavigation } from "@/components/shared/mobile-navigation";
import { Sidebar } from "@/components/shared/sidebar";
import { PostActionDialog } from "@/components/shared/post-action-dialog";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth, getCurrentUserAsync, selectUser } from "@/store/auth/authSlice";
import { PATHS } from "@/constants/paths";

const RootLayout = () => {
  const { user, loading } = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUserAsync());
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    dispatch(clearAuth);
    return <Navigate to={PATHS.LOGIN} />;
  }


  return (
    <div className="md:flex">
      <Sidebar />
      <div className={`md:w-[calc(100%-240px)] `}>
        <Outlet />
      </div>
      <PostActionDialog />
      <MobileNavigation />
    </div>
  );
};

export default RootLayout;
