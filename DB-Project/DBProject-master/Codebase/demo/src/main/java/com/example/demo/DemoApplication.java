package com.example.demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class);
	}


	/*@Bean
	public CommandLineRunner commandLineRunner(ApplicationContext applicationContext) {
		return args -> {
			System.out.println("Inspecting beans from Spring boot:");
			String[] beansName = applicationContext.getBeanDefinitionNames();
			Arrays.sort(beansName);
			for (String beanN : beansName) {
				System.out.println(beanN);
			}
		};
	}*/
}
