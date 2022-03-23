package com.hummingbird.backend.menu.controller;
import com.hummingbird.backend.menu.dto.CreateMenuDto;
import com.hummingbird.backend.menu.dto.GetMenuDto;
import com.hummingbird.backend.menu.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@SuppressWarnings("ALL")
@CrossOrigin("*")
@RestController
public class MenuController {

    private MenuService menuService;

    @Autowired
    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    //create
    @PostMapping("/menu/new")
    public Long createMenu(@RequestBody CreateMenuDto dto){
        //owner id 받아오기
        Long ownerId = 1L; //임시값
        return menuService.submit(dto,ownerId);
    }

    //read
    @GetMapping( "/menu/get/owner") //owner 아이디로 조회
    public List<GetMenuDto> getMenuByOwner(Long ownerId){
        return menuService.getMenuList(ownerId);
    }

    @GetMapping( "/menu/get") //메뉴 아이디로 조회
    public GetMenuDto getMenu(Long menuId){
        return menuService.getMenu(menuId);
    }

    //update
    @PostMapping("/menu/update")
    public Long updateMenu(Long menuId,String updateName){
        return menuService.update(menuId, updateName);
    }

    //delete
    @PostMapping("/menu/delete")
    public boolean deleteMenu(Long menuId){
        return menuService.delete(menuId);
    }


}
