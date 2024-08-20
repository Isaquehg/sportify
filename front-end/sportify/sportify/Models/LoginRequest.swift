//
//  LoginRequest.swift
//  sportify
//
//  Created by Isaque Hollanda Goncalves on 20/08/24.
//

import Foundation

struct LoginRequest: Encodable {
    let email: String
    let password: String
}
