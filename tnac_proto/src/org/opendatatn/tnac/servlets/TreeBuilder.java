package org.opendatatn.tnac.servlets;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


public class TreeBuilder {
	JSONObject root;
	
	public TreeBuilder(JSONObject root){
		this.root=root;
	}
	
	public String getHTML(){
		String result="";
		try{
			JSONArray array=root.getJSONArray("children");
			for (int i=0;i<array.length();i++){
				result=result+buildTreeItem(true,array.getJSONObject(i));
			}
		}
		catch (Throwable t){
			t.printStackTrace();
		}
		return result;
	}
	
	private String buildTreeItem(boolean isFolder,JSONObject c) throws JSONException{
		String classItem=(isFolder)?"folder":"file";
		String result="<li><span res='"+((c.has("resource"))?c.get("resource"):"")+"' code='"+c.get("code")+"' class='"+classItem+"'>"+link(c.getString("name"),isFolder,c.getString("path"))+"</span>";
		if (isFolder){
			result=result+"<ul>"+buildSubtree(c.getJSONArray("children"))+"</ul>"+System.getProperty("line.separator");
		}
		return result+ "</li>";
	}

	private String buildSubtree(JSONArray array) throws JSONException {
		String html="";
		for (int c=0;c<array.length();c++){
			String li=buildTreeItem(array.getJSONObject(c).has("resource"),array.getJSONObject(c))+System.getProperty("line.separator");
			html=html+li;
		}
		return html;
	}

	private String link(String name, boolean isFolder, String path) {
		if (isFolder)
			return "<a class=\"agg\" href=\""+path+"\">"+name+"</a>";
		else{
			return "<a class=\"res\" href=\""+path+"\">"+name+"</a>";
		}
	}

}

