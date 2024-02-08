package com.jopaulo.dscatalog.listener;

import org.hibernate.envers.RevisionListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import com.jopaulo.dscatalog.entities.Revision;
import com.jopaulo.dscatalog.repositories.UserRepository;

public class EntityRevisionListener implements RevisionListener {

	@Override
	public void newRevision(Object revisionEntity) {
		Revision revision = (Revision) revisionEntity;
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		if (authentication != null && authentication.isAuthenticated()) {
			Object principal = authentication.getPrincipal();
			if (principal instanceof String) {
				String username = (String) principal;
				revision.setUsuario(username);
			}
		}

	}

}
