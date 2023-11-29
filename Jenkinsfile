pipeline {
    agent any
    
    environment {
        NODE_PATH = '/var/lib/jenkins/workspace/ARtist - Frontend'
    }

    stages {
        stage('Clone Git Repository') { 
            steps {
                git branch: 'master', credentialsId: 'Jaezic', url:'https://github.com/AR-tist/ARtist_FrontEnd.git'
                echo 'Clone Git Repository'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'sudo npm install'
            }
        }
        stage('Build React App') {
            steps {
                dir('./') {
                    sh 'pwd'
                    sh 'ls'
                    sh 'sudo npm run build'
                    sh 'pwd'
                }
            }
        }
    }
} 