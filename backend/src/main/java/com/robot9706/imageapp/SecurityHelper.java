package com.robot9706.imageapp;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class SecurityHelper {
    public static String extensionToRole(String ext) {
        return "ROLE_EXT_" + ext.toUpperCase();
    }

    public static List<String> getAllowedExtensions(List<String> exts) {
        List<String> extensions = new ArrayList<>();

        UserDetails userDetails = getUserDetails();
        if (userDetails != null) {
            Collection<GrantedAuthority> authorities = (Collection<GrantedAuthority>)userDetails.getAuthorities();

            for (String ext : exts) {
                if (isRolePresent(authorities, extensionToRole(ext))) {
                    extensions.add(ext);
                }
            }
        }

        return extensions;
    }

    public static final boolean hasRole(String role) {
        boolean hasRole = false;
        UserDetails userDetails = getUserDetails();
        if (userDetails != null) {
            Collection<GrantedAuthority> authorities = (Collection<GrantedAuthority>)userDetails.getAuthorities();
            if (isRolePresent(authorities, role)) {
                hasRole = true;
            }
        }
        return hasRole;
    }

    protected static UserDetails getUserDetails() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserDetails userDetails = null;
        if (principal instanceof UserDetails) {
            userDetails = (UserDetails) principal;
        }
        return userDetails;
    }

    private static boolean isRolePresent(Collection<GrantedAuthority> authorities, String role) {
        boolean isRolePresent = false;
        for (GrantedAuthority grantedAuthority : authorities) {
            isRolePresent = grantedAuthority.getAuthority().equals(role);
            if (isRolePresent) break;
        }
        return isRolePresent;
    }
}
