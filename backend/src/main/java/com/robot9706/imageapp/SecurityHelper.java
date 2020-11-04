package com.robot9706.imageapp;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.robot9706.imageapp.dto.AppUser;
import com.robot9706.imageapp.dto.EntryDTO;
import com.robot9706.imageapp.security.Consts;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

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

    public static boolean canAccess(AppUser user, EntryDTO entry) {
        String ext = entry.getExtension();

        List<String> roles = user.getRoles();

        return (roles.contains("ADMIN") || roles.contains(extensionToRole(ext)));
    }

    public static String verifyToken(String token) {
        return JWT.require(Algorithm.HMAC512(Consts.SECRET.getBytes()))
                .build()
                .verify(token.replace(Consts.TOKEN_PREFIX, ""))
                .getSubject();
    }
}
