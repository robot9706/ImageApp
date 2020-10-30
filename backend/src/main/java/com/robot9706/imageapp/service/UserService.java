package com.robot9706.imageapp.service;

import com.auth0.jwt.interfaces.Claim;
import com.robot9706.imageapp.dto.AppUser;
import com.robot9706.imageapp.repository.UserMongoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;
import java.util.stream.Collectors;

import static com.robot9706.imageapp.security.Consts.ROLES_CONST;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserMongoRepository userMongoRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(final String s) throws UsernameNotFoundException {
        final AppUser user = userMongoRepository.findApplicationUserByUsername(s);
        if (user == null) {
            throw new UsernameNotFoundException(s);
        }

        Collection<GrantedAuthority> authorities = user.getRoles().stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
        return new User(user.getUsername(), user.getPassword(), authorities);
    }

    public void saveNewUser(final AppUser user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userMongoRepository.save(user);
    }

    public AppUser findUserByUserName(String username) {
        return userMongoRepository.findApplicationUserByUsername(username);
    }
}