@file:OptIn(ExperimentalDistributionDsl::class)

import org.gradle.internal.impldep.org.bouncycastle.asn1.crmf.SinglePubInfo.web
import org.jetbrains.kotlin.gradle.targets.js.dsl.ExperimentalDistributionDsl

plugins {
    kotlin("multiplatform") version "1.9.22"
    `maven-publish`
}

group = "nl.astraeus"
version = "1.1.0"

repositories {
    mavenLocal()
    mavenCentral()
}

kotlin {
    /* Targets configuration omitted. 
    *  To find out how to configure the targets, please follow the link:
    *  https://kotlinlang.org/docs/reference/building-mpp-with-gradle.html#setting-up-targets */
    js(IR) {
        binaries.executable()
        browser {
            //produceKotlinLibrary()
            testTask {
                useKarma {
                    useChromeHeadless()
                }
            }
            distribution {
                outputDirectory.set(File("$projectDir/web/"))
            }
        }
    }

    sourceSets {
        val commonMain by getting
        val jsMain by getting {
            dependencies {
                implementation("nl.astraeus:kotlin-komponent:1.2.1")
            }
        }
    }
}
