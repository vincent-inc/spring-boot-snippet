const ENTITY = `package {0}.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "{2}")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class {1} 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private {3};

{4}
}
`;

const DAO = `package {0}.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface {1}Dao extends JpaRepository<{1}, {3}> 
{
{2}
}`;

const SERVICE = `package {0}.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.util.ObjectUtils;

import {0}.dao.{1}Dao;
import {0}.model.{1};

@Service
public class {1}Service 
{
    @Autowired
    private {1}Dao {2}Dao;
    
    public List<{1}> getAll()
    {
        return this.{2}Dao.findAll();
    }

    public {1} getBy{4}({6} {5})
    {
        Optional<{1}> {2} = this.{2}Dao.findBy{4}({5});

        if({2}.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "{1} ID not found");

        return {2}.get();
    }

    public {1} create{1}({1} {2})
    {
        {2} = this.{2}Dao.save({2});
        return {2};
    }

    public {1} modify{1}({6} {5}, {1} {2})
    {
        if({5} != {2}.get{4}())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "{1} modifier ID and modify ID not match");
            
        {1} old{1} = this.getBy{4}({5});
        
{3}

        old{1} = this.{2}Dao.save(old{1});
        return old{1};
    }

    public vo{5} delete{1}({6} {5})
    {
        this.{2}Dao.deleteBy{4}({5});
    }
}`;

const CONTROLLER = `package {0}.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import {0}.model.{1};
import {0}.service.{1}Service;

@RestController
@RequestMapping("/{2}s")
class {1}Controller {

    @Autowired
    {1}Service {2}Service;

    @GetMapping
    public ResponseEntity<List<{1}>> getAll() {
        try {
            List<{1}> {2}s = new ArrayList<{1}>();

            {2}Service.getAll().forEach({2}s::add);

            if ({2}s.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            return new ResponseEntity<>({2}s, HttpStatus.OK);
        } 
        catch (Exception e) 
        {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("{{4}}")
    public ResponseEntity<{1}> getBy{3}(@PathVariable("{4}") {5} {4}) {
        try
        {
            {1} {2} = {2}Service.getBy{3}({4});

            return new ResponseEntity<>({2}, HttpStatus.OK);
        }
        catch(Exception ex)
        {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }

    @PostMapping
    public ResponseEntity<{1}> create(@RequestBody {1} {2}) {
        try 
        {
            {1} saved{1} = {2}Service.create{1}({2});
            return new ResponseEntity<>(saved{1}, HttpStatus.CREATED);
        } 
        catch (Exception e) 
        {
            return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
        }
    }

    @PutMapping("{{4}}")
    public ResponseEntity<{1}> update(@PathVariable("{4}") {5} {4}, @RequestBody {1} {2}) {
        try 
        {
            {2} = this.{2}Service.modify{1}({4}, {2});

            return new ResponseEntity<>({2}, HttpStatus.OK);
        }
        catch(Exception ex)
        {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("{{4}}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("{4}") {5} {4}) {
        try 
        {
            {2}Service.delete{1}({4});
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } 
        catch (Exception e) 
        {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }
}`

export const VARIABLE = {ENTITY: ENTITY, DAO: DAO, SERVICE: SERVICE, CONTROLLER: CONTROLLER}