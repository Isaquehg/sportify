//
//  NavigationManager.swift
//  sportify
//
//  Created by Isaque Hollanda Goncalves on 21/08/24.
//

import Foundation

class NavigationManager: ObservableObject {
    @Published var currentView: CurrentView = .login
}

enum CurrentView {
    case login
    case main
    case profile
    case notifications
    case chat
    case bookmarks
    case settings
}
