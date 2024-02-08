package com.jopaulo.dscatalog.entities;

import java.util.Date;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.envers.RevisionEntity;
import org.hibernate.envers.RevisionNumber;
import org.hibernate.envers.RevisionTimestamp;

import com.jopaulo.dscatalog.listener.EntityRevisionListener;

@Entity
@RevisionEntity(value = EntityRevisionListener.class)
public class Revision {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@RevisionNumber
	private long revisionId;
	
	@RevisionTimestamp
	private Date revisionaDate;
	
	private String usuario;
	
	public Revision() {
	}

	public Revision(long revisionId, Date revisionaDate, String usuario) {
		super();
		this.revisionId = revisionId;
		this.revisionaDate = revisionaDate;
		this.usuario = usuario;
	}

	public long getRevisionId() {
		return revisionId;
	}

	public void setRevisionId(long revisionId) {
		this.revisionId = revisionId;
	}

	public Date getRevisionaDate() {
		return revisionaDate;
	}

	public void setRevisionaDate(Date revisionaDate) {
		this.revisionaDate = revisionaDate;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	@Override
	public int hashCode() {
		return Objects.hash(revisionId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Revision other = (Revision) obj;
		return revisionId == other.revisionId;
	}

}
