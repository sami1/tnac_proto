package org.opendatatn.tnac.servlets;

import java.io.File;
import java.io.IOException;

import org.apache.commons.io.FileUtils;

public class LocalJsonLoader {
	private File container;
	private String name;
	public LocalJsonLoader(String rest, File container) {
		this.container=container;
		System.out.println(rest);
		if (rest.startsWith("/"))
			rest=rest.substring(1);
		name=rest.replace('/', '-');
		name="raw-"+name+".json";
	}

	public String load() throws IOException {
		// TODO Auto-generated method stub
		return FileUtils.readFileToString(new File(container,name), "UTF-8");
	}

}
