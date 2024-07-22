//
//  User.swift
//  sportify
//
//  Created by Isaque Hollanda Goncalves on 19/07/24.
//

import Foundation

struct User: Identifiable {
    let id: Int
    let name: String
    let email: String
    let password: String
    var playedGames: [String]
}
