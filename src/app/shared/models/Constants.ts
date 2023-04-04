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
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import {0}.model.{1};

public interface {1}Dao extends JpaRepository<{1}, {3}>
{
{2}
}`;

const SERVICE = `package {0}.service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.data.domain.Example;
import org.springframework.data.redis.core.RedisTemplate;

import com.google.gson.Gson;

import {0}.dao.{1}Dao;
import {0}.model.{1};
import {0}.util.ReflectionUtils;
import {0}.util.splunk.Splunk;

@Service
public class {1}Service
{
    public static final String HASH_KEY = "{0}.{2}s";

    @Value("\${spring.cache.redis.{2}TTL}")
    private int {2}TTL = 600;

    @Autowired
    private Gson gson;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Autowired
    private {1}Dao {2}Dao;

    public List<{1}> getAll()
    {
        return this.{2}Dao.findAll();
    }

    public {1} getBy{4}({6} {5})
    {
        //get from redis
        String key = String.format("%s.%s", HASH_KEY, {5});
        try
        {
            String json{1} = this.redisTemplate.opsForValue().get(key);
            if(json{1} != null)
                return this.gson.fromJson(json{1}, {1}.class);
        }
        catch(Exception ex)
        {
            Splunk.logError(ex);
        }

        //get from database
        Optional<{1}> o{1} = this.{2}Dao.findBy{4}({5});

        if(o{1}.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "{1} ID not found");

        {1} {2} = o{1}.get();

        //save to redis
        try
        {
            this.redisTemplate.opsForValue().set(key, gson.toJson({2}));
            this.redisTemplate.expire(key, {2}TTL, TimeUnit.SECONDS);
        }
        catch(Exception ex)
        {
            Splunk.logError(ex);
        }

        return {2};
    }

    public List<{1}> getAllByMatchAll({1} {2})
    {
        Example<{1}> example = (Example<{1}>) ReflectionUtils.getMatchAllMatcher({2});
        return this.{2}Dao.findAll(example);
    }

    public List<{1}> getAllByMatchAny({1} {2})
    {
        Example<{1}> example = (Example<{1}>) ReflectionUtils.getMatchAnyMatcher({2});
        return this.{2}Dao.findAll(example);
    }

    public {1} create{1}({1} {2})
    {
        {2} = this.{2}Dao.save({2});
        return {2};
    }

    public {1} modify{1}({6} {5}, {1} {2})
    {
        {1} old{1} = this.getBy{4}({5});

{3}

        old{1} = this.{2}Dao.save(old{1});

        //remove from redis
        try
        {
            String key = String.format("%s.%s", HASH_KEY, {5});
            this.redisTemplate.delete(key);
        }
        catch(Exception ex)
        {
            Splunk.logError(ex);
        }

        return old{1};
    }

    public {1} patch{1}({6} {5}, {1} {2})
    {
        {1} old{1} = this.getBy{4}({5});

{7}

        old{1} = this.{2}Dao.save(old{1});

        //remove from redis
        try
        {
            String key = String.format("%s.%s", HASH_KEY, {5});
            this.redisTemplate.delete(key);
        }
        catch(Exception ex)
        {
            Splunk.logError(ex);
        }

        return old{1};
    }

    public vo{5} delete{1}({6} {5})
    {
        this.{2}Dao.deleteBy{4}({5});

        //remove from redis
        try
        {
            String key = String.format("%s.%s", HASH_KEY, {5});
            this.redisTemplate.delete(key);
        }
        catch(Exception ex)
        {
            Splunk.logError(ex);
        }
    }
}`;

const CONTROLLER = `package {0}.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.ErrorResponseException;

import jakarta.ws.rs.QueryParam;
import io.swagger.v3.oas.annotations.Operation;

import {0}.model.{1};
import {0}.service.{1}Service;
import {0}.util.splunk.Splunk;

@RestController
@RequestMapping("/{2}s")
class {1}Controller
{
    @Autowired
    {1}Service {2}Service;

    @Operation(summary = "Get a list of all {1}")
    @GetMapping
    public ResponseEntity<List<{1}>> getAll()
    {
        try
        {
            List<{1}> {2}s = {2}Service.getAll();

            if ({2}s.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            return new ResponseEntity<>({2}s, HttpStatus.OK);
        }
        catch(ErrorResponseException ex)
        {
            throw ex;
        }
        catch (Exception ex)
        {
            Splunk.logError(ex);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Get {1} base on id in path variable")
    @GetMapping("{{4}}")
    public ResponseEntity<{1}> getBy{3}(@PathVariable("{4}") {5} {4})
    {
        try
        {
            {1} {2} = {2}Service.getBy{3}({4});

            return new ResponseEntity<>({2}, HttpStatus.OK);
        }
        catch(ErrorResponseException ex)
        {
            throw ex;
        }
        catch(Exception ex)
        {
            Splunk.logError(ex);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Get a list of all {1} that match all information base on query parameter")
    @GetMapping("match_all")
    public ResponseEntity<List<{1}>> matchAll(@QueryParam("{2}") {1} {2})
    {
        try
        {
            List<{1}> {2}s = this.{2}Service.getAllByMatchAll({2});

            if ({2}s.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            return new ResponseEntity<>({2}s, HttpStatus.OK);
        }
        catch(ErrorResponseException ex)
        {
            throw ex;
        }
        catch (Exception ex)
        {
            Splunk.logError(ex);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Get a list of all {1} that match any information base on query parameter")
    @GetMapping("match_any")
    public ResponseEntity<List<{1}>> matchAny(@QueryParam("{2}") {1} {2})
    {
        try
        {
            List<{1}> {2}s = this.{2}Service.getAllByMatchAny({2});

            if ({2}s.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            return new ResponseEntity<>({2}s, HttpStatus.OK);
        }
        catch(ErrorResponseException ex)
        {
            throw ex;
        }
        catch (Exception ex)
        {
            Splunk.logError(ex);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Create a new {1}")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<{1}> create(@RequestBody {1} {2})
    {
        try
        {
            {1} saved{1} = {2}Service.create{1}({2});
            return new ResponseEntity<>(saved{1}, HttpStatus.CREATED);
        }
        catch(ErrorResponseException ex)
        {
            throw ex;
        }
        catch (Exception ex)
        {
            Splunk.logError(ex);
            return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
        }
    }

    @Operation(summary = "Modify an {1} base on id in path variable")
    @PutMapping("{{4}}")
    public ResponseEntity<{1}> update(@PathVariable("{4}") {5} {4}, @RequestBody {1} {2})
    {
        try
        {
            {2} = this.{2}Service.modify{1}({4}, {2});

            return new ResponseEntity<>({2}, HttpStatus.OK);
        }
        catch(ErrorResponseException ex)
        {
            throw ex;
        }
        catch(Exception ex)
        {
            Splunk.logError(ex);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Patch an {1} base on id in path variable")
    @PatchMapping("{{4}}")
    public ResponseEntity<{1}> patch(@PathVariable("{4}") {5} {4}, @RequestBody {1} {2})
    {
        try
        {
            {2} = this.{2}Service.patch{1}({4}, {2});

            return new ResponseEntity<>({2}, HttpStatus.OK);
        }
        catch(ErrorResponseException ex)
        {
            throw ex;
        }
        catch(Exception ex)
        {
            Splunk.logError(ex);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Delete an {1} base on id in path variable")
    @DeleteMapping("{{4}}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<HttpStatus> delete(@PathVariable("{4}") {5} {4})
    {
        try
        {
            {2}Service.delete{1}({4});
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        catch(ErrorResponseException ex)
        {
            throw ex;
        }
        catch (Exception ex)
        {
            Splunk.logError(ex);
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }
}`

export const VARIABLE = {ENTITY: ENTITY, DAO: DAO, SERVICE: SERVICE, CONTROLLER: CONTROLLER}
