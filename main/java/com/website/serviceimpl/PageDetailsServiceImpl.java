package com.website.serviceimpl;


import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.website.model.PageDetailsModel;
import com.website.repository.PageRepository;
import com.website.service.PageService;

@Service
@Transactional
public class PageDetailsServiceImpl  implements PageService {
	@Autowired
	private PageRepository pagerepo;
	private static final Logger LOGGER = LoggerFactory.getLogger(PageDetailsServiceImpl.class);

	@Override
	public List<PageDetailsModel> findallDetails(String description) {
		LOGGER.debug("In PageDetailsServiceImpl: "+description);

		List<PageDetailsModel>finalList=new ArrayList<PageDetailsModel>();
		String finalString=description.trim();
	
		
//		String[]arr=finalString.split(" ");
//		int length=arr.length;
//		int count=0;
//		StringBuilder sb=new StringBuilder();
//		for(String s:arr) {
//			if(length-1==count) {
//				sb.append(s);
//			}
//			else {
//				sb.append(s+"||");
//				count++;
//			}
//		
//		}
		//System.out.println(sb.toString());
		//System.out.println(sb.toString());
		String[]arr=finalString.split(" ");
		for(String s:arr) {
			List<PageDetailsModel>  details=pagerepo.getByDesc(s);
			for(PageDetailsModel pd:details) {
				finalList.add(pd);
				
			}
			//details= null;
		}
		//List<PageDetails>  details=pagerepo.findallPageDetailsBypageTitleandpageUrl(sb.toString());

		return finalList;
	}
}

