<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <img src="../assets/logo.png" alt="无锡灵掌机器人科技有限公司" class="logo" />
          <p>{{ $t('footer.slogan') }}</p>
        </div>
        
        <div class="footer-links">
          <h4>{{ $t('footer.services.title') }}</h4>
          <ul>
            <li><router-link to="/services">{{ $t('footer.services.s1') }}</router-link></li>
            <li><router-link to="/services">{{ $t('footer.services.s2') }}</router-link></li>
            <li><router-link to="/services">{{ $t('footer.services.s3') }}</router-link></li>
            <li><router-link to="/services">{{ $t('footer.services.s4') }}</router-link></li>
          </ul>
        </div>
        
        <div class="footer-links">
          <h4>{{ $t('footer.about.title') }}</h4>
          <ul>
            <li><router-link to="/about">{{ $t('footer.about.a1') }}</router-link></li>
            <li><router-link to="/about">{{ $t('footer.about.a2') }}</router-link></li>
            <li><router-link to="/about">{{ $t('footer.about.a3') }}</router-link></li>
            <li><router-link to="/about">{{ $t('footer.about.a4') }}</router-link></li>
          </ul>
        </div>
        
        <div class="footer-contact">
          <h4>{{ $t('footer.contact.title') }}</h4>
          <ul>
            <li>📧 contact@lingzhang.ai</li>
            <li>📞 +86 400-888-8888</li>
            <li>📍 {{ $t('footer.contact.location') }}</li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="footer-social">
          <a href="#" class="social-link">{{ $t('footer.social.wechat') }}</a>
          <a href="#" class="social-link">{{ $t('footer.social.weibo') }}</a>
          <a href="#" class="social-link">{{ $t('footer.social.linkedin') }}</a>
        </div>
        <div class="footer-copyright">
          <p>&copy; {{ new Date().getFullYear() }} {{ $t('footer.copyright') }}</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped lang="scss">
.footer {
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: var(--spacing-xl) 0 var(--spacing-md);
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.footer-logo .logo {
  height: 40px;
  width: auto;
  margin-bottom: var(--spacing-sm);
}

.footer-logo p {
  color: var(--color-secondary);
  margin-bottom: 0;
  font-size: 14px;
}

.footer-links h4,
.footer-contact h4 {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
  color: var(--color-white);
}

.footer-links ul,
.footer-contact ul {
  list-style: none;
}

.footer-links li,
.footer-contact li {
  margin-bottom: 8px;
}

.footer-links a {
  color: var(--color-secondary);
  font-size: 14px;
  transition: color var(--transition-fast);
  
  &:hover {
    color: var(--color-white);
    text-decoration: none;
  }
}

.footer-contact li {
  color: var(--color-secondary);
  font-size: 14px;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--spacing-md);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.footer-social {
  display: flex;
  gap: var(--spacing-lg);
}

.social-link {
  color: var(--color-secondary);
  font-size: 14px;
  transition: color var(--transition-fast);
  
  &:hover {
    color: var(--color-white);
    text-decoration: none;
  }
}

.footer-copyright p {
  color: var(--color-secondary);
  font-size: 12px;
  margin-bottom: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
  
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>