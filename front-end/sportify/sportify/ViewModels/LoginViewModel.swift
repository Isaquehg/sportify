//
//  LoginViewModel.swift
//  sportify
//
//  Created by Isaque Hollanda Goncalves on 25/07/24.
//

import Foundation

class LoginViewModel: ObservableObject {

    @Published var email: String = ""
    @Published var password: String = ""

    func login() {
        let authService = AuthService()
        let loginRequest = LoginRequest(email: email, password: password)
        authService.login(loginRequest: loginRequest, completion: { (result) in
            _ = result
        })
        
    }
}
