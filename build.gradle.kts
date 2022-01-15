import org.jetbrains.kotlin.gradle.targets.js.webpack.KotlinWebpackOutput.Target.VAR

plugins {
    kotlin("multiplatform") version "1.6.10"
    `maven-publish`
}

group = "nl.astraeus"
version = "1.0.0"

repositories {
    mavenCentral()
}

kotlin {
    /* Targets configuration omitted. 
    *  To find out how to configure the targets, please follow the link:
    *  https://kotlinlang.org/docs/reference/building-mpp-with-gradle.html#setting-up-targets */
    js((IR)) {
        binaries.executable()
        browser {
            //produceKotlinLibrary()
            testTask {
                useKarma {
                    useChromeHeadless()
                }
            }
            distribution {
                directory = File("$projectDir/web/")
            }
        }
    }

    sourceSets {
        val commonMain by getting {
            dependencies {
                implementation("nl.astraeus:kotlin-komponent:1.0.0")
            }
        }
        val jsMain by getting
    }
}
