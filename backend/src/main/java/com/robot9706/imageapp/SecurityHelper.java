package com.robot9706.imageapp;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class SecurityHelper {
    public static String extensionToRole(String ext) {
        return "ROLE_EXT_" + ext.toUpperCase();
    }

    public static String roleToExtension(String role) {
        if (!role.startsWith("ROLE_EXT_")) {
            return null;
        }

        return role.substring("ROLE_EXT_".length()).toLowerCase();
    }

    public static List<String> modifyExtensionRoles(List<String> roles, List<String> extensions) {
        List<String> newRoles = roles.stream().filter(role -> !role.startsWith("ROLE_EXT_")).collect(Collectors.toList());

        for (String ext : extensions) {
            newRoles.add(extensionToRole(ext));
        }

        return newRoles;
    }

    public static final boolean hasRole(String role) {
        Collection<GrantedAuthority> authorities = (Collection<GrantedAuthority>)SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        return isRolePresent(authorities, role);
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
